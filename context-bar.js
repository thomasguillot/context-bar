#!/usr/bin/env node
const path = require('path');
const { execFileSync } = require('child_process');

let raw = '';
process.stdin.on('data', (c) => (raw += c));
process.stdin.on('end', () => {
	let d = {};
	try {
		d = JSON.parse(raw);
	} catch {}

	const dim = (s) => `\x1b[2m${s}\x1b[0m`;
	const parts = [];

	if (d.model?.display_name) parts.push(dim(d.model.display_name));

	const dir = d.workspace?.current_dir || d.cwd;
	if (dir) {
		let label = path.basename(dir);
		try {
			const branch = execFileSync('git', ['-C', dir, 'branch', '--show-current'], {
				encoding: 'utf8',
				stdio: ['ignore', 'pipe', 'ignore'],
				timeout: 500,
			}).trim();
			if (branch) label += ` ${dim('(' + branch + ')')}`;
		} catch {}
		parts.push(label);
	}

	const pct = d.context_window?.used_percentage;
	if (typeof pct === 'number') {
		const width = 10;
		const filled = Math.min(width, Math.round((pct / 100) * width));
		const colour = pct < 50 ? 32 : pct < 65 ? 33 : pct < 80 ? '38;5;208' : 31;
		const bar = '█'.repeat(filled) + '░'.repeat(width - filled);
		parts.push(`\x1b[${colour}m${bar} ${pct}%\x1b[0m`);
	}

	process.stdout.write(parts.join(dim(' │ ')));
});
