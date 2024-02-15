/*

Write a function that computes the dominant writing direction in a string of text. 
Remember that each script object has a direction property that can be "ltr" (left to 
right), "rtl" (right to left), or "ttb" (top to bottom).

The dominant direction is the direction of a majority of the characters that have a 
script associated with them. The characterScript and countBy functions defined earlier 
in the chapter are probably useful here.

*/

function characterScript(code) {
  for (let script of SCRIPTS) {
    if (script.ranges.some(([from, to]) => {
      return code >= from && code < to;
    })) {
      return script;
    }
  }
  return null;
}

function sliceStr(str) {
  let arr = [];
  for (let i = 0; i <= str.length-1; i++) {
    arr.push(str[i]);
  }
  return arr;
}

function getMajorityScriptName(str) {
  let groups = [];
  let sliced_arr = sliceStr(str);
  let max;

  sliced_arr.forEach(function(l) {
    let res = characterScript(l.codePointAt());
    if (res == null) return;
    if (groups[res.name] == null) groups[res.name] = 0;
    groups[res.name]++
  })

  for (const g in groups) {
    if (max == null) {
      max = g;
      continue;
    }
    if (groups[max] < groups[g]) max = g;
  }
  return max;
}

function getScriptFromName(name) {
  for (let s = 0; s <= SCRIPTS.length-1; s++) {
    let script = SCRIPTS[s];
    if (script.name === name) return script;
  }
}

// we are using requirejs.org !
require(['scripts/scripts.js'], function scripts() {

  function dominantDirection(str) {
    return getScriptFromName(getMajorityScriptName(str)).direction
  }
  
  console.log(dominantDirection("Hello!"));
  // → ltr
  console.log(dominantDirection("Hey, مساء الخير"));
  // → rtl

})
