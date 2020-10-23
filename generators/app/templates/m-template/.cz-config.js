// copy to https:raw.githubusercontent.com/leonardoanalista/cz-customizable/master/cz-config-EXAMPLE.js
module.exports = {
  types: [
    { value: 'fix', name: 'fix:      A bug fix' },
    { value: 'feat', name: 'feat:     A new feature' },
    {
      value: 'chore',
      name:
        'chore:    Changes to the build process or auxiliary tools\n            and libraries such as documentation generation',
    },
    {
      value: 'style',
      name:
        'style:    Changes that do not affect the meaning of the code\n            (white-space, formatting, missing semi-colons, etc)',
    },
    {
      value: 'refactor',
      name: 'refactor: A code change that neither fixes a bug nor adds a feature',
    },
    { value: 'docs', name: 'docs:     Documentation only changes' },
    { value: 'test', name: 'test:     Adding missing tests' },
  ],

  scopes: [],
  // override the messages, defaults are as follows
  messages: {
    type: "Select the type of change that you're committing:",
    scope: 'Denote the SCOPE of this change:(press enter to skip)',
    // used if allowCustomScopes is true
    customScope: 'Denote the SCOPE of this change:(press enter to skip)',
    subject: 'Write a short, imperative tense description of the change (max 50 chars):\n',
    body:
      'Provide a LONGER description of the change (optional). Use "|" to break new line: (press enter to skip)\n',
    breaking: 'List any BREAKING CHANGES (optional):(press enter to skip)\n',
    footer: 'List any ISSUES CLOSED by this change. E.g.: #31, #34: (press enter to skip)\n',
    confirmCommit: 'Are you sure you want to proceed with the commit above?',
  },

  allowCustomScopes: true,
  allowBreakingChanges: ['feat', 'fix'],
  // skip any questions you want
  skipQuestions: ['body'],

  // limit subject length
  subjectLimit: 50,
  // breaklineChar: '|', // It is supported for fields body and footer.
  // footerPrefix : 'ISSUES CLOSED:'
  // askForBreakingChangeFirst : true, // default is false
};
