#!/usr/bin/env python
# -*- coding:utf-8 -*-
import urllib

base_html = './html/base.html'
html = []
for line in open(base_html, 'r'):
    html.append(line.strip())

base_html = ''.join(html)
encoded = urllib.quote(base_html)

encoded = encoded.replace('header1', u'という名前で')
encoded = encoded.replace('header2', u'ショートカットを作成します')
encoded = encoded.replace('description_string', u'上記アイコンがホーム画面に追加されます')
encoded = encoded.replace('method1', u'ショートカット作成方法')
encoded = encoded.replace('method2', u'下のアイコンをタップして「ホーム画面に追加」を選択してください')

f = open('./html/encoded.html', 'w');
f.write('data:text/html;charset=utf-8,%s' % encoded.encode('utf-8'))
f.close()

print '===== Done. ====='
