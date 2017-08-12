import fs from 'fs-extra';
import { homedir } from 'os';
import test from 'ava';
import path from 'path';

import countGitTags from './index';

const fixtures = path.join(process.cwd(), 'test', 'fixtures');

test.before('rename git folders', () => {
  fs.renameSync(path.join(fixtures, 'local-tagged-3', 'git'), path.join(fixtures, 'local-tagged-3', '.git'));
  fs.renameSync(path.join(fixtures, 'local-tagged-0', 'git'), path.join(fixtures, 'local-tagged-0', '.git'));
  fs.renameSync(path.join(fixtures, 'remote-tagged-2', 'git'), path.join(fixtures, 'remote-tagged-2', '.git'));
});

test.after.always('rename .git folders', () => {
  fs.renameSync(path.join(fixtures, 'local-tagged-3', '.git'), path.join(fixtures, 'local-tagged-3', 'git'));
  fs.renameSync(path.join(fixtures, 'local-tagged-0', '.git'), path.join(fixtures, 'local-tagged-0', 'git'));
  fs.renameSync(path.join(fixtures, 'remote-tagged-2', '.git'), path.join(fixtures, 'remote-tagged-2', 'git'));
});

test('get 0 if the directory is not a repo', (t) => {
  t.deepEqual(countGitTags({
    path: homedir(),
    local: true,
  }), 0);
});

test('get the count of a repo with 3 tags', (t) => {
  t.deepEqual(countGitTags({
    path: 'test/fixtures/local-tagged-3',
    local: true,
  }), 3);
});

test('get 0 if local repo has no tags', (t) => {
  t.deepEqual(countGitTags({
    path: 'test/fixtures/local-tagged-0',
  }), 0);
});

test('get tags from remote repository', (t) => {
  t.deepEqual(countGitTags({
    path: 'test/fixtures/remote-tagged-2',
    local: false,
  }), 2);
});
