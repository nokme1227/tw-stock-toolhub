/* 工具站前端密碼門（防君子：擋誤入，不擋有心人）
 * 改密碼：改下面 SITE_PASSWORD 這一行，push 後生效。
 */
(function () {
  var SITE_PASSWORD = 'ktstock2026';
  var KEY = 'toolhub_auth_v1';

  if (sessionStorage.getItem(KEY) === '1') return;

  function unlock() {
    sessionStorage.setItem(KEY, '1');
    var ov = document.getElementById('site-lock');
    if (ov) ov.remove();
    document.documentElement.style.overflow = '';
  }

  document.addEventListener('DOMContentLoaded', function () {
    document.documentElement.style.overflow = 'hidden';

    var ov = document.createElement('div');
    ov.id = 'site-lock';
    ov.innerHTML =
      '<div class="lock-card">' +
      '<div class="lock-title">台股研究工具站</div>' +
      '<div class="lock-sub">請輸入存取密碼</div>' +
      '<input id="lock-pw" type="password" placeholder="密碼" autocomplete="off" />' +
      '<button id="lock-btn">進入</button>' +
      '<div id="lock-err" class="lock-err"></div>' +
      '<div class="lock-note">本站內容僅供個人研究，不構成投資建議。</div>' +
      '</div>';

    var css = document.createElement('style');
    css.textContent =
      '#site-lock{position:fixed;inset:0;z-index:99999;display:flex;align-items:center;justify-content:center;background:#0f172a;}' +
      '#site-lock .lock-card{width:min(340px,88vw);padding:32px 28px;border-radius:12px;background:#1e293b;text-align:center;box-shadow:0 12px 40px rgba(0,0,0,.45);}' +
      '#site-lock .lock-title{font-size:20px;font-weight:700;color:#f1f5f9;margin-bottom:6px;}' +
      '#site-lock .lock-sub{font-size:13px;color:#94a3b8;margin-bottom:18px;}' +
      '#site-lock #lock-pw{width:100%;box-sizing:border-box;padding:10px 12px;margin-bottom:12px;border:1px solid #334155;border-radius:8px;background:#0f172a;color:#f1f5f9;font-size:15px;outline:none;}' +
      '#site-lock #lock-btn{width:100%;padding:10px;border:none;border-radius:8px;background:#2563eb;color:#fff;font-size:15px;cursor:pointer;}' +
      '#site-lock #lock-btn:hover{background:#1d4ed8;}' +
      '#site-lock .lock-err{min-height:20px;margin-top:8px;font-size:13px;color:#f87171;}' +
      '#site-lock .lock-note{margin-top:10px;font-size:11px;color:#64748b;}';
    document.head.appendChild(css);
    document.body.appendChild(ov);

    var pw = document.getElementById('lock-pw');
    var err = document.getElementById('lock-err');
    function tryUnlock() {
      if (pw.value === SITE_PASSWORD) {
        unlock();
      } else {
        err.textContent = '密碼錯誤，請重試。';
        pw.value = '';
        pw.focus();
      }
    }
    document.getElementById('lock-btn').addEventListener('click', tryUnlock);
    pw.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') tryUnlock();
    });
    pw.focus();
  });
})();
