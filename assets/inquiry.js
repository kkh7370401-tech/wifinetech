(() => {
  const form = document.getElementById('inquiry-form');
  if (!form) return;
  const status = document.getElementById('inquiry-status');
  const fallback = document.getElementById('copy-fallback');
  const lang = () => document.documentElement.lang === 'ko' ? 'ko' : document.documentElement.lang === 'zh-CN' ? 'cn' : 'en';
  const messages = {
    ko: {opened:'이메일 앱에서 내용을 확인한 후 발송해 주세요. 아직 문의가 접수된 것은 아닙니다. 앱이 열리지 않으면 ‘문의 내용 복사’를 이용해 주세요.', copied:'문의 내용을 복사했습니다. wft@wifintech.co.kr로 이메일을 보내주세요.', manual:'자동 복사가 지원되지 않습니다. 아래 내용을 선택해 복사한 후 이메일로 보내주세요.'},
    en: {opened:'Please review and send the message in your email app. Your inquiry has not yet been submitted. If no app opens, use Copy inquiry.',copied:'Inquiry copied. Please email it to wft@wifintech.co.kr.',manual:'Automatic copying is unavailable. Select and copy the text below, then send it by email.'},
    cn: {opened:'请在邮件应用中确认并发送内容。咨询尚未提交。若应用未打开，请使用“复制咨询内容”。',copied:'咨询内容已复制。请发送邮件至wft@wifintech.co.kr。',manual:'无法自动复制。请选中下方内容并复制，然后通过邮件发送。'}
  };
  function payload() {
    const d = new FormData(form);
    const get = key => String(d.get(key) || '').trim();
    const cleanSubject = get('subject').replace(/[\r\n]+/g,' ');
    const topic = form.elements.category.selectedOptions[0].textContent;
    const labels = lang()==='ko' ? ['성함','회사명','이메일','연락처','문의 분야','문의 내용'] : lang()==='cn' ? ['姓名','公司','邮箱','电话','咨询领域','咨询内容'] : ['Name','Company','Email','Phone','Topic','Message'];
    const values = [get('name'),get('company'),get('email'),get('phone'),topic,get('message')];
    return {subject:'[WI-FINE TECH] '+(cleanSubject || topic),body:labels.map((label,i)=>label+': '+values[i]).join('\n\n')};
  }
  form.addEventListener('submit', event => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    const data = payload();
    window.location.href = 'mailto:wft@wifintech.co.kr?subject='+encodeURIComponent(data.subject)+'&body='+encodeURIComponent(data.body);
    status.textContent=messages[lang()].opened;
  });
  document.getElementById('copy-inquiry').addEventListener('click', async () => {
    if (!form.reportValidity()) return;
    const data=payload();
    const text=data.subject+'\n\n'+data.body;
    try {
      await navigator.clipboard.writeText(text);
      fallback.hidden=true;
      status.textContent=messages[lang()].copied;
    } catch {
      fallback.value=text;
      fallback.hidden=false;
      fallback.focus();
      fallback.select();
      status.textContent=messages[lang()].manual;
    }
  });
  document.querySelectorAll('[data-lang]').forEach(button=>button.addEventListener('click',()=>{status.textContent='';}));
})();
