import {PublishIssue} from './services/publish-issue'
import {IssueBodyBuilder} from './services/issue-body-builder'
import {CommitCountFetcher} from './services/commit-count-fetcher'
import {PRCountFetcher} from './services/pr-count-fetcher'
import {LineCountFetcher} from './services/line-count-fetcher'
import {Octokit} from 'octokit'
import {option} from './option'

async function run(): Promise<void> {
  const octokit = new Octokit({auth: process.env.TOKEN})
  const bodyBuilder = new IssueBodyBuilder(option())

  bodyBuilder
    .registerFetcher(new CommitCountFetcher(octokit))
    .registerFetcher(new LineCountFetcher())
    .registerFetcher(new PRCountFetcher(octokit))

  new PublishIssue(octokit, bodyBuilder, option()).publish()
}

run()
