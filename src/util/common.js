exports.dotFormat = (val, length) => {
  if(val){
    if(val.length < length){
      return val;
    }else{
      return val.substring(val, length-1) + '...';
    }
  }else{
    return '--'
  }
};
