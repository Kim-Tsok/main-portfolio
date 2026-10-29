import {test} from 'node:test';
import assert from 'node:assert/strict';
import {createElement} from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import ArticleBody from '../components/article-body';

const render=(text:string)=>renderToStaticMarkup(createElement(ArticleBody,{text}));
test('article uploads render as images with their accessible description',()=>{
 const html=render('![A project on a phone](https://res.cloudinary.com/demo/image/upload/sample.jpg)');
 assert.match(html,/<img /);
 assert.match(html,/alt="A project on a phone"/);
});
test('article images reject untrusted sources and missing descriptions',()=>{
 for(const text of ['![Image](https://untrusted.example/image.jpg)','![Image](javascript:alert(1))','![](/image.jpg)']){
  assert.doesNotMatch(render(text),/<img /);
 }
 assert.doesNotMatch(render('<script>alert(1)</script>'),/<script>/);
});
