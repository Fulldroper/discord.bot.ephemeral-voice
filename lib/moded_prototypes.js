module.exports = () => {
  Number.prototype.numCutter = function (num, digits = 1) {
    if (!num) num = this;
    const lookup = [
      { value: 1, symbol: "" },
      { value: 1e3, symbol: "k" },
      { value: 1e6, symbol: "M" },
      { value: 1e9, symbol: "G" },
      { value: 1e12, symbol: "T" },
      { value: 1e15, symbol: "P" },
      { value: 1e18, symbol: "E" }
    ];
    for(let i = 0;i < lookup.length;i++){
        if(
            (i == (lookup.lenght - 1 ))|| (
                num > lookup[i].value &&
                num < lookup[i+1].value
            )
        ){
            const toFixed = +`1e${digits}`
            return `${Math.trunc((num / lookup[i].value)*toFixed)/toFixed}${lookup[i].symbol}`
        }
    }
  }
  Number.prototype.msToDate = function (x) {
      if (!x) x = this;
      x = Number.parseInt(x, 10)
      const 
          toSec = 1000,
          toMin = toSec * 60,
          toHour = toMin * 60,
          toDay = toHour * 24,
          toYears = toDay * 365.25,
          f = b => {
              const n = Math.trunc(x / b);
              return (n > 0 ? (x = x - (n * b), n) : undefined);
          }
      return {
          y : f(toYears),
          d : f(toDay),
          h : f(toHour),
          m : f(toMin),
          s : f(toSec)
      }; 
  }
  Number.prototype.toFixed = function(num) {
      const n = `${this}`
      let payload = ''
      for (let i = 0; i < (num - n.length); i++) {
          payload+= '0'
      }
      return (payload+n);
  }
  Array.prototype.rand = function () {
      return this[Math.floor(Math.random() * this.length)]
  }
  Array.prototype.includesOneOf = function(array) {
      for (let i = 0; i < this.length; i++) {
        for (let j = 0; i < array.length; j++) {
          if(this[i] === array[j]) return true;
        }
      }
      return false;
  };
}