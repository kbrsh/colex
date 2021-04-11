from flask import Flask, request
from flask_cors import CORS
import gpt_2_simple as gpt2

sess = gpt2.start_tf_sess()
gpt2.load_gpt2(sess, run_name='run1')

web_site = Flask(__name__)
CORS(web_site)

@web_site.route('/api', methods=['POST'])
def api():
  return '{"easy":"' + generate(request.json['text'], "Easy") + '","hard":"' + generate(request.json['text'], "Hard") + '"}'

def generate(text, difficulty):
  changedText = "Normal Article:\n" + text + "\n\n" + difficulty + " Article:\n"
  return ai(changedText)

def ai(prompt):
  return gpt2.generate(sess, return_as_list=True, nsamples=1, truncate="<|endoftext|>", temperature=1.0, prefix=prompt)[0]

web_site.run(host='0.0.0.0', port=8080)
