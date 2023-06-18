import {PublishIssue} from './services/publish-issue'
import {IssueBodyBuilder} from './services/issue-body-builder'
import {CommitCountFetcher} from './services/commit-count-fetcher'
import {PRCountFetcher} from './services/pr-count-fetcher'
import {LineCountFetcher} from './services/line-count-fetcher'
import {Octokit} from 'octokit'
import {option} from './option'
import * as core from '@actions/core'

async function run(): Promise<void> {
  core.debug('start')
  core.debug(process.env.GITHUB_TOKEN ?? 'token')
  const octokit = new Octokit({auth: core.getInput('token')})
  core.debug(`TOKEN is ${process.env.TOKEN ? 'set' : 'not set'}`)
  core.debug(`GITHUB_TOKEN is ${process.env.GITHUB_TOKEN ? 'set' : 'not set'}`)
  core.debug(`TEST is ${process.env.TEST ? 'set' : 'not set'}`)
  core.debug('octokit')
  const bodyBuilder = new IssueBodyBuilder(option())

  bodyBuilder
    .registerFetcher(new CommitCountFetcher(octokit))
    .registerFetcher(new LineCountFetcher())
    .registerFetcher(new PRCountFetcher(octokit))

  new PublishIssue(octokit, bodyBuilder).publish()
}

run()
