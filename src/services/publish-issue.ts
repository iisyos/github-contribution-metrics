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
    console.log(body)

    // const issue = {
    //   owner: 'iisyos',
    //   repo: 'actions_runner',
    //   title: 'New Issue',
    //   body
    // }
    // const {data} = await this.octokit.rest.issues.create(issue)
    // console.log('Created issue: %s', data.html_url)
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
