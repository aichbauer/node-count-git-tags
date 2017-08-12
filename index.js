import execa from 'execa';
import isGit from 'is-git-repository';
import { platform } from 'os';
import makepath from 'path';
import pathIsAbsolute from 'path-is-absolute';

const cwd = process.cwd();

const countGitTags = ({ path, local } = {}) => {
  let countOfTags = 0;

  let thisPath = path || cwd;
  thisPath = pathIsAbsolute(thisPath) ? thisPath : makepath.join(cwd, thisPath);
  const thisLocal = local === undefined ? true : local;

  if (!isGit(thisPath)) {
    return 0;
  }

  try {
    let getTagsExec;
    let getTags;
    if (thisLocal) {
      if (platform() === 'win32') {
        getTagsExec = `pushd ${thisPath} & git tag`;
      } else {
        getTagsExec = `(cd ${thisPath} ; git tag)`;
      }

      getTags = execa.shellSync(getTagsExec).stdout;
    } else {
      if (platform() === 'win32') {
        getTagsExec = `pushd ${thisPath} & git ls-remote --tags`;
      } else {
        getTagsExec = `(cd ${thisPath} ; git ls-remote --tags)`;
      }

      getTags = execa.shellSync(getTagsExec).stdout;
    }

    countOfTags = getTags.length === 0 ? getTags.length : getTags.split('\n').length;

    return countOfTags;
  } catch (e) {
    return 0;
  }
};

export default countGitTags;
