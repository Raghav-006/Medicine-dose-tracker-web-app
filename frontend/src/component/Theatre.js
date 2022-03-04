import React from 'react';
import {getProject} from "@theatre/core"

export default function Theatre() {

    const proj = getProject(
        // the ID of the project is "My first project"
        "First project",
        // These are the object's default values (and as we'll later learn, its props types)
        {
            // we pick our first props's name to be "foo". It's default value is 0.
            // Theatre will determine that the type of this prop is a number
            foo: 0,
            // Second prop is a boolean called "bar", and it defaults to true.
            bar: true,
            // Last prop is a string
            baz: "A string",
        }
      )
      // create a sheet
    const sheet = proj.sheet(
        // Our sheet is identified as "Scene"
        "Scene"
    )

    //console.log(proj.value.foo)
    //console.log(proj.value.bar)
    //console.log(proj.value.baz)

  return (
    <>
        
    </>
  );
}
