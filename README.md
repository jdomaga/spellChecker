# Jimmy Domagala Tang, Basic English spell checker

## Brief: Make a spell checker for BASIC English

Time allowed: 1 hour (outside of the interview time)

Background:

British American Scientific International Commercial (BASIC) English is a constructed language. It has 850 English words, carefully chosen to make the language easy to learn but still powerful enough to communicate every day ideas and actions. The rules of usage are identical to full English, so the speaker communicates in perfectly good, but simple, English.

It is an interesting exercise to try to write out a complicated idea in simple English (e.g. https://xkcd.com/1133), and a spell checker that tells you when you are using BASIC English would be a useful tool.

## Time breakdown (60 mins) :

1. 5 mins design, user story, scope work
2. 5 mins figma
3. 5 mins prj setup / initial commit
4. 5 mins Unit tests
5. 5 mins solution structure
6. 30 mins implementation
7. 5 mins deploy/ build, brainstorm extensions and methods to implement those, scope work on them

## Base user stories:

1. As a user, I want to be able to type multiple lines of text, so I can spell check my writing.
2. As a sighted user, I want to be able to see errors visually within the text I have entered so I can see where to fix.

## Important user stories, outside scope (fast-follows):

3. As a visually impaired user, I want to be able to jump through errors.
4. As a visually impaired user, I want to have context to the errors I get (ie: read out the sentence the error is contained in, and be able to fix the spelling error efficiently)

## Extended user stories:

5. As a user, I want to get spelling suggestions on error inputs so I can more quickly fix my errors,
6. As a user, I want to be able to save the text, or load in a saved text file so I can save my work between sessions
7. As a user on desktop, I want to be able to see a list of all errors in one consistent location so I can quickly fix the errors.
8. As a user on desktop, I want my error list to be in a sequential order so I can locate them quicker.
9. As a developer, I want to be able to update the list of words so we our app can evolve with language usage.
10. As a developer, I want the core functionality to be language independent so we can easily expand to other “basic” language lists.

## Constraints

I found several constraints during development that I added in to lower scope fo teh solution.

1. only BASIC english will be used
2. any non-alphabetical character will signal the end of a "word"
3. when autofilling, things like doubled punctuations, extra newlines, etc. can be cleaned up

## General implementation steps

1. create blank project using vite --> react + ts
2. install tailwind (css utilities)
3. install vitest (like jest, but jest doesnt work well with ESM which vite uses to compile so fast)
4. grab data from links provided, format it into array
5. write vitest functions for finding
6. create general page structure (text areas, labels, headings), extract re-use into components as time permits
7. allow for user input in the text area, lift state up to app level so it can be shared with error screen (could use context, but wouldnt make a lot of sense due to how frequently data changes, and how close the state is to a common ancestor)
8. create functions that can break the text up, search through it for matching words in our array of BASIC words, extract functions to a utils folder

## Extension 1: Replace

9. convert error list to list of inputs
10. add functions to split punctuation, replace words found with values entered in error side
11. add functions for replacing the values in the textArea with ones from the error side
12. add ways to display when an error has been fixed on the error side
13. add test for replacing in vitest

## Extension 2: Adding Cypress

14. install cypress
15. open test runner, add basic POC tests for app component

## Possible extensions

First I would target the fast-follows as those increase accessibility and WCAG compliance.
Once those are finished, there are multiple avenues for extending the app, all of which i am happy to discuss further (bullet points listed below)

### copy / UI extensions

1. simplify wording on content for the page. As our target demographic would be ESL users, we should simplify text to make it easier for them to navigate
2. add tutorials/ instructions in other languages. same reason as above
3. simplify UI and provide a natural navigation to help users who cant understand the content/ are less tech experienced. weigh side by side vs errors below the text area.
4. mobile views, and their usage. would it be the same? mobile usually is used for short blurbs or messaging, maybe we can redesign mobile to look like common messaging apps such as whatsapp, etc.

### development / maintainability extensions

1. ensure that text functions (search. replace, etc) are lang agnostic.
2. host translation files (currently in assets) in another location, eg: s3 bucket, some endpoint we serve, to allow for hot updates
3. above would also help in having multiple languages available in "BASIC" form.
4. add e2e tests with cypress
5. split more components into smaller "atomic" components
6. better handling of newlines. punctuation, etc
7. with translations in external api call, create custom hook for using that API (or just import useFetch)
8. chagnes to package.json to allow for root relative imports (avoid using the ../../../)
9. add additional context in error pane for each word, for screen readers and sighted as well.

### functionality extensions

most of the functionality extensions are described by the user stories we left for later implementation.

## Resources used

see the Resources.md file

focus points:

1. wording is approachable, describe user story
2. prettier linting! something the team really cares about
3. testing
4. splitting components into re-usable pieces
5. usage of sematic html, utilizing browsers own ability to underline for text areas.
