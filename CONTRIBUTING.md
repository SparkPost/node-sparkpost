# Contributing to SparkPost

Transparency is one of our core values, and we encourage developers to contribute and become part of the SparkPost developer community.
## Prerequisite to contribution
Part of this transparency is the perpetual management. Every developer (even our own) to get started is required, <a href="https://www.clahub.com/agreements/SparkPost/node-sparkpost">sign the Contributor License Agreement</a>. Your pull requests will be flagged as "has not signed CLA" unless you agree to the CLA.

Before writing code search for issues or create a new issue to confirm where your contribution fits into our roadmap.
Current milestone Pull Requests will receive priority review for merging.

## Contribution Steps
1. Fork this repository
2. Create a new branch named after the issue you’ll be fixing (include the issue number as the feature branch name)
3. Read and apply our [code style guide](CODE_STYLE_GUIDE.markdown). Make sure your submission meets our contribution guidelines.
4. Author tests, code to satisfy, clean up/refactor
    1. Include your tests in the 'test' directory in the appropriate test file
    2. To test the SDK
    ```
    grunt test
    ```
5. Submit a new Pull Request applying your feature/fix branch to the develop branch of the SparkPost SDK
    1. Your code must pass all unit tests prior to submitting a Pull Request.
    2. Lint and test your code prior to submitting
6. Part of the submission process will be signing the [Contibutor License Agreement](CONTRIBUTOR_LICENSE_AGREEMENT.markdown)
