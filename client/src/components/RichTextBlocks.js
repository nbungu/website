// client/src/components/RichTextBlocks.js

import React from "react";

function RichTextBlocks({ richtext }) {
  
  return (
    <>
      {richtext && richtext.map(textBlock => {
        if (textBlock.type === 'paragraph') {
          return (
            <p className="text-start lh-base">
              {textBlock.children.map(e => {
                if (e.type === 'text') {
                  return (
                    <span className={`${e.bold && 'fw-bold'} ${e.italic && 'fst-italic'}`}>{e.text === "" ? "\u00A0" : e.text}</span>
                  )
                }
                else if (e.type === 'link') { 
                  return (
                    <a href={e.url} className={`${e.children[0].bold && 'fw-bold'} ${e.children[0].italic && 'fst-italic'}`}>{e.children[0].text}</a>
                  )
                }
                else {
                  return (<p></p>)
                }
              }
              )}
            </p>
          );
        }
        else if (textBlock.type === 'heading') {
          const HeadingComponent = `h${textBlock.level}`;
          return (
            <HeadingComponent className={`text-start lh-lg`}>
              {textBlock.children.map(e => {
                if (e.type === 'text') {
                  return (
                    <span className={`${e.bold && 'fw-bold'} ${e.italic && 'fst-italic'}`}>{e.text === "" ? "\u00A0" : e.text}</span>
                  )
                }
                else if (e.type === 'link') { 
                  return (
                    <a href={e.url} className={`${e.children[0].bold && 'fw-bold'} ${e.children[0].italic && 'fst-italic'}`}>{e.children[0].text}</a>
                  )
                }
                else {
                  return (<p></p>)
                }
              }
              )}
            </HeadingComponent>
          );
        }
        else {
          return (<p></p>)
        }
        })
      } 
    </>
  )
}

export default RichTextBlocks