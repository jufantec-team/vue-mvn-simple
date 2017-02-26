/**
 * SQL请求json格式封装
 * 由于设计时没有考虑命名重复对js的影响，所以此处增加了一个 sql 对象
 */
class DataTemplate{
  constructor(){
    this.sql = {}
  }

  from(table){
    this.sql.from = table
    return this
  }

  select(s){
    this.sql.select = s
    return this
  }

  data(json){
    this.sql.data = json
    return this
  }

  where(json){
    this.sql.where = json
    return this
  }

  asc(col){
    if (col){
      if (this.sql.orderby){
        this.sql.orderby += ','
      }
      this.sql.orderby = col + ' asc'
    }
    return this
  }

  desc(col){
    if (col){
      if (this.sql.orderby){
        this.sql.orderby += ','
      }
      this.sql.orderby = col + ' desc'
    }
    return this 
  }

  option(opt){
    this.sql.option = opt
    return this
  }
}

export default DataTemplate