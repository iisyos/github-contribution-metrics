import {StatsFetcher} from '../interfaces/stats-fetcher'
import {exec} from 'child_process'
import {Option} from '../option'

export class LineCountFetcher implements StatsFetcher {
  async fetchStats(author: string, option: Option): Promise<string> {
    const command = `git log --numstat --pretty="%H" --author='${author}' --since=${option.since} --until=${option.until} --no-merges`
    const promise = new Promise<string>((resolve, reject) => {
      exec(command, (err, stdout) => {
        if (err) {
          reject(err)
          return
        }
        const lines = stdout.split('\n')

        let addedLines = 0
        let deletedLines = 0
        for (const line of lines) {
          const parts = line.split('\t')
          if (parts.length === 3 && parts[0] !== '-' && parts[1] !== '-') {
            addedLines += Number(parts[0])
            deletedLines += Number(parts[1])
          }
        }
        resolve(
          `### Lines\nCount: ${
            addedLines + deletedLines
          } (+${addedLines}, -${deletedLines})`
        )
      })
    })
    const body = await promise
    return body
  }
}
