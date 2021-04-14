import resolve from '@rollup/plugin-node-resolve';
import builtins from 'builtin-modules';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import { terser } from 'rollup-plugin-terser';
import executable from 'rollup-plugin-executable';

export default [
    {
        input: './render.test.js',
        output: {
            file: 'index.cjs',
            format: 'cjs',
            compact: true,
            banner: '#!/usr/bin/env node\n'
        },
        external: [...builtins, 'canvas', 'jsdom'],
        plugins: [
            resolve({
                preferBuiltins: false
            }),
            commonjs({
                include: [
                    'node_modules/**',
                ],
                exclude: [
                    'node_modules/ol/**',
                ]
            }),
            json(),
            executable()
        ]
    }
];
