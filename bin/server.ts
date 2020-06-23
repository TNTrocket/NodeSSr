import webpack  from 'webpack'
import app from '../server/index'
import webpackConfig from '../webpack.config.js'
import ora from 'ora'
import chalk from 'chalk'

const spinner = ora('building for production...')
spinner.start()
webpack(webpackConfig as webpack.Configuration, function (err, stats):void {
    spinner.stop()
    if (err) throw err
    process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false
    }) + '\n\n')

    if (stats.hasErrors()) {
      console.log(chalk.red('  Build failed with errors.\n'))
      process.exit(1)
    }

    console.log(chalk.cyan('  Build complete.\n'))
    console.log(chalk.yellow(
      '  Tip: built files are meant to be served over an HTTP server.\n' +
      '  Opening index.html over file:// won\'t work.\n'
    ))
  const port: number = Number(process.env.port) || 8080
   app.listen(port, function(){
     console.log(`listent on ${port}`)
   })
  })

