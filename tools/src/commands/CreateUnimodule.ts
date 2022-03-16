import { Command } from '@expo/commander';

type ActionOptions = {
  name: string;
  template?: string;
  useLocalTemplate?: boolean;
};

async function action(_options: ActionOptions) {
  throw new Error(
    'This command has been replaced by the create-expo-module package (`npx create-expo-module`).'
  );
}

export default (program: Command) => {
  program
    .command('create-unimodule')
    .alias('cu')
    .description('Creates a new unimodule under the `packages` folder.')
    .option('-n, --name <string>', 'Name of the package to create.', null)
    .option(
      '--use-local-template',
      'Uses local `packages/expo-module-template` instead of the one published to NPM. Ignored when -t option is used.'
    )
    .option(
      '-t, --template <string>',
      'Local directory or npm package containing template for unimodule'
    )
    .asyncAction(action);
};
