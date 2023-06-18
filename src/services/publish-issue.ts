import {Octokit} from 'octokit'
import {IssueBodyBuilder} from './issue-body-builder'
import {Option} from '../option'

export class PublishIssue {
  constructor(
    private octokit: Octokit,
    private bodyBuilder: IssueBodyBuilder,
    private option: Option
  ) {}
  async publish(): Promise<void> {
    const contributors = await this.getContributors()
    const body = await this.bodyBuilder.buildBody(contributors)
    const issue = {
      owner: this.option.owner,
      repo: this.option.repo,
      title: this.getTitle(),
      body
    }
    await this.octokit.rest.issues.create(issue)
  }

  private async getContributors(): Promise<string[]> {
    const {data} = await this.octokit.rest.repos.listContributors({
      owner: this.option.owner,
      repo: this.option.repo
    })
    const contributors = data
      .filter(contributor => contributor.type === 'User')
      .map(contributor => contributor.login) as string[]
    return contributors
  }

  private getTitle(): string {
    return `Report:${this.option.since} - ${this.option.until}`
  }
}
