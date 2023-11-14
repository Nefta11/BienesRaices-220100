import Path  from "path"

export default {
    mode:"development",
    entry:{
        map:'./src/lib/map.js'
    },
    output:{
        filename:'[name].js',
        path: Path.resolve('./src/public/js')
    }
}