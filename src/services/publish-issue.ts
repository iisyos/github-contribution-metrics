import {Octokit} from 'octokit'
import {IssueBodyBuilder} from './issue-body-builder'
export class PublishIssue {
  constructor(
    private octokit: Octokit,
    private bodyBuilder: IssueBodyBuilder
  ) {}
  async publish(): Promise<void> {
    const body = await this.bodyBuilder.buildBody(['iisyos'])
    const issue = {
      owner: 'iisyos',
      repo: 'actions_runner',
      title: 'New Issue',
      body
    }
    const {data} = await this.octokit.rest.issues.create(issue)
    console.log('Created issue: %s', data.html_url)
  }
}
