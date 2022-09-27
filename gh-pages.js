var ghpages = require('gh-pages');

ghpages.publish(
    'public', // path to public directory
    {
        branch: 'gh-pages',
        repo: 'https://github.com/iwsfutcmd/nisenan_orthography.git',
        user: {
            name: 'Ben Yang',
            email: 'ben@panlex.org'
        }
    },
    () => {
        console.log('Deploy Complete!')
    }
)
