import {Octokit} from 'octokit'

export class PublishIssue {
  octokit: Octokit
  constructor(auth: string) {
    this.octokit = new Octokit({auth})
  }
  async publish(): Promise<void> {
    const issue = {
      owner: 'iisyos',
      repo: 'actions_runner',
      title: 'New Issue',
      body: 'Issue body'
    }
    const {data} = await this.octokit.rest.issues.create(issue)
    console.log('Created issue: %s', data.html_url)
  }
}
