import {Octokit} from 'octokit'
import {IssueBodyBuilder} from './issue-body-builder'
export class PublishIssue {
  constructor(
    private octokit: Octokit,
    private bodyBuilder: IssueBodyBuilder
  ) {}
  async publish(): Promise<void> {
    const contributors = await this.getContributors()
    const body = await this.bodyBuilder.buildBody(contributors)

    const issue = {
      owner: 'iisyos',
      repo: 'actions_runner',
      title: 'New Issue',
      body
    }
    await this.octokit.rest.issues.create(issue)
  }

  private async getContributors(): Promise<string[]> {
    const {data} = await this.octokit.rest.repos.listContributors({
      owner: 'iisyos',
      repo: 'portfolio'
    })
    const contributors = data
      .filter(contributor => contributor.type === 'User')
      .map(contributor => contributor.login) as string[]
    return contributors
  }
}
