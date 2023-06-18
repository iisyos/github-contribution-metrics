import {Octokit} from 'octokit'
import {StatsFetcher} from '../interfaces/stats-fetcher'

export class CommitCountFetcher implements StatsFetcher {
  constructor(private octokit: Octokit) {}

  async fetchStats(author: string): Promise<string> {
    const {data: commits} = await this.octokit.rest.repos.listCommits({
      owner: 'iisyos',
      repo: 'actions_runner',
      author
    })
    const commitCount = commits.length

    return `Commits: ${commitCount}\n`
  }
}
