import {Option} from '../option'

export interface StatsFetcher {
  fetchStats(contributor: string, option: Option): Promise<string>
}
