import nextConfig from 'eslint-config-next/core-web-vitals';
import nextTypescript from 'eslint-config-next/typescript';
import prettierConfig from 'eslint-config-prettier';

const eslintConfig = [
  ...nextConfig,
  ...nextTypescript,
  prettierConfig,
  {
    // DOM 동기화 목적의 effect 내 setState는 프로젝트 패턴상 허용
    rules: {
      'react-hooks/set-state-in-effect': 'warn',
    },
  },
  {
    ignores: ['out/', '.next/', 'node_modules/'],
  },
];

export default eslintConfig;
