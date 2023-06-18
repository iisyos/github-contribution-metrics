import {PublishIssue} from './services/publish-issue'
import {IssueBodyBuilder} from './services/issue-body-builder'
import {CommitCountFetcher} from './services/commit-count-fetcher'
import {PRCountFetcher} from './services/pr-count-fetcher'
import {Octokit} from 'octokit'

async function run(): Promise<void> {
  const octokit = new Octokit({auth: process.env.GITHUB_TOKEN})
  const bodyBuilder = new IssueBodyBuilder()
  bodyBuilder
    .registerFetcher(new CommitCountFetcher(octokit))
    .registerFetcher(new PRCountFetcher(octokit))

  new PublishIssue(octokit, bodyBuilder).publish()
}

run()
