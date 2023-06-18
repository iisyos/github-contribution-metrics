import {Octokit} from 'octokit'
import {StatsFetcher} from '../interfaces/stats-fetcher'
import {Option} from '../option'

export class CommitCountFetcher implements StatsFetcher {
  constructor(private octokit: Octokit) {}
  async fetchStats(author: string, option: Option): Promise<string> {
    const {data: commits} = await this.octokit.rest.repos.listCommits({
      author,
      ...option
    })
    const commitCount = commits.length

    return `### Commits\nCount: ${commitCount}\n`
  }
}
