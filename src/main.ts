import {PublishIssue} from './services/publish-issue'
import {IssueBodyBuilder} from './services/issue-body-builder'
import {CommitCountFetcher} from './services/commit-count-fetcher'
import {PRCountFetcher} from './services/pr-count-fetcher'
import {LineCountFetcher} from './services/line-count-fetcher'
import {Octokit} from 'octokit'
import {option} from './option'
import * as core from '@actions/core'

async function run(): Promise<void> {
  const auth = `${process.env.TOKEN}-token`
  core.debug(`auth: ${auth}`)
  const octokit = new Octokit({auth})
  const bodyBuilder = new IssueBodyBuilder(option())

  bodyBuilder
    .registerFetcher(new CommitCountFetcher(octokit))
    .registerFetcher(new LineCountFetcher())
    .registerFetcher(new PRCountFetcher(octokit))

  new PublishIssue(octokit, bodyBuilder).publish()
}

run()
