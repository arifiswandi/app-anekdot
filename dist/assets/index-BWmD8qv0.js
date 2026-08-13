const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/xlsx-Dx3HtQZX.js","assets/xlsx-BMK5z-wr.js"])))=>i.map(i=>d[i]);
import{n as e}from"./rolldown-runtime-y2wrX6ue.js";import{a as t,c as n,i as r,l as i,n as a,o,r as s,s as c,t as l}from"./react-vendor-CspiWf_T.js";(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var u=e(n()),d=e(i()),f=e(c()),p=e(l());function m({onLogin:e,postToGas:t}){let[n,r]=(0,d.useState)(``),[i,a]=(0,d.useState)(``),[o,s]=(0,d.useState)(!1);return(0,p.jsxs)(p.Fragment,{children:[(0,p.jsx)(`style`,{children:`
        * { box-sizing: border-box; }
        body {
          margin: 0;
          background: #f4f7fb;
        }
        .login-page {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 28px;
          background:
            radial-gradient(circle at top left, rgba(15,118,110,0.18), transparent 30%),
            radial-gradient(circle at bottom right, rgba(212,167,60,0.2), transparent 28%),
            linear-gradient(135deg, #f3f7ff 0%, #edf8f3 100%);
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }
        .login-shell {
          width: min(1200px, 100%);
          display: grid;
          grid-template-columns: 1.2fr 0.95fr;
          gap: 24px;
          align-items: center;
        }
        .login-hero {
          background: linear-gradient(135deg, #102a43 0%, #14486d 100%);
          border-radius: 28px;
          min-height: 620px;
          padding: 48px 40px;
          box-shadow: 0 24px 60px rgba(15, 23, 42, 0.12);
          color: white;
          display: flex;
          flex-direction: column;
          justify-content: center;
          position: relative;
          overflow: hidden;
        }
        .login-hero::before,
        .login-hero::after {
          content: "";
          position: absolute;
          border-radius: 50%;
          background: rgba(255,255,255,0.05);
        }
        .login-hero::before {
          width: 420px;
          height: 420px;
          top: -160px;
          right: -100px;
        }
        .login-hero::after {
          width: 240px;
          height: 240px;
          left: -70px;
          bottom: -50px;
        }
        .hero-badge {
          width: 90px;
          height: 90px;
          border-radius: 24px;
          background: linear-gradient(135deg, #d4a73c, #f1c75d);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 2rem;
          font-weight: 900;
          color: #102a43;
          box-shadow: 0 18px 28px rgba(212,167,60,0.3);
          position: relative;
          z-index: 1;
        }
        .hero-content {
          position: relative;
          z-index: 1;
          max-width: 480px;
        }
        .hero-content h1 {
          margin: 22px 0 12px;
          font-size: clamp(2.1rem, 3vw, 3.5rem);
          line-height: 1.1;
        }
        .hero-content p {
          margin: 0 0 28px;
          font-size: 1.05rem;
          color: rgba(255,255,255,0.82);
          line-height: 1.7;
        }
        .hero-points {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .hero-points li {
          display: flex;
          align-items: center;
          gap: 10px;
          color: rgba(255,255,255,0.9);
          font-weight: 600;
        }
        .hero-points li::before {
          content: "✓";
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 22px;
          height: 22px;
          border-radius: 50%;
          background: rgba(212,167,60,0.2);
          color: #f7d77e;
          font-size: 0.9rem;
        }
        .login-card {
          width: 100%;
          max-width: 470px;
          margin: 0 auto;
          background: rgba(255,255,255,0.94);
          border: 1px solid rgba(15, 76, 92, 0.08);
          border-top: 6px solid #d4a73c;
          border-radius: 24px;
          box-shadow: 0 24px 60px rgba(15, 23, 42, 0.12);
          padding: 30px 26px 28px;
          position: relative;
          overflow: hidden;
        }
        .login-card::before {
          content: "";
          position: absolute;
          inset: 0 auto auto 0;
          width: 180px;
          height: 180px;
          background: rgba(16,42,67,0.04);
          border-radius: 50%;
          transform: translate(-30%, -30%);
        }
        .login-brand {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: 14px;
          margin-bottom: 22px;
          position: relative;
          z-index: 1;
        }
        .school-badge {
          width: 74px;
          height: 74px;
          border-radius: 50%;
          background: linear-gradient(135deg, #102a43, #1d5c7b);
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 800;
          font-size: 1.5rem;
          letter-spacing: 1px;
          box-shadow: 0 18px 35px rgba(16,42,67,0.18);
        }
        .login-brand h2 {
          margin: 0;
          font-size: clamp(1.7rem, 2vw, 2.2rem);
          color: #102a43;
        }
        .login-brand p {
          margin: 0;
          color: #52667d;
          font-size: 0.93rem;
          letter-spacing: 0.03em;
        }
        .login-form {
          display: flex;
          flex-direction: column;
          gap: 16px;
          position: relative;
          z-index: 1;
        }
        .login-field {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .login-field label {
          font-weight: 700;
          color: #233a4f;
          font-size: 0.92rem;
        }
        .login-input {
          width: 100%;
          padding: 12px 14px;
          border-radius: 12px;
          border: 1px solid #d7e1ec;
          background: #f8fafc;
          font-size: 1rem;
          transition: all 0.2s ease;
          color: #102a43;
        }
        .login-input:focus {
          outline: none;
          border-color: #0f766e;
          box-shadow: 0 0 0 4px rgba(15,118,110,0.12);
          background: #fff;
        }
        .login-button {
          width: 100%;
          padding: 14px 16px;
          border: none;
          border-radius: 12px;
          background: linear-gradient(135deg, #0f766e, #0b5e64);
          color: #fff;
          font-weight: 700;
          font-size: 1rem;
          cursor: pointer;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
          box-shadow: 0 12px 20px rgba(15,118,110,0.22);
        }
        .login-button:hover {
          transform: translateY(-1px);
        }
        .login-button:disabled {
          opacity: 0.72;
          cursor: not-allowed;
        }

        @media (max-width: 900px) {
          .login-shell {
            grid-template-columns: 1fr;
          }
          .login-hero {
            min-height: 280px;
            padding: 34px 22px;
          }
          .hero-content {
            max-width: none;
          }
          .hero-content h1 {
            margin-top: 14px;
          }
        }
      `}),(0,p.jsx)(`div`,{className:`login-page`,children:(0,p.jsxs)(`div`,{className:`login-shell`,children:[(0,p.jsx)(`div`,{className:`login-hero`,children:(0,p.jsxs)(`div`,{className:`hero-content`,children:[(0,p.jsx)(`div`,{className:`hero-badge`,children:`BK`}),(0,p.jsx)(`h1`,{children:`Catatan Anekdot Siswa`}),(0,p.jsx)(`p`,{children:`Portal pendataan dan pencatatan perilaku siswa untuk mendukung pelayanan Bimbingan Konseling secara cepat, rapi, dan profesional.`}),(0,p.jsxs)(`ul`,{className:`hero-points`,children:[(0,p.jsx)(`li`,{children:`Input data siswa lebih cepat`}),(0,p.jsx)(`li`,{children:`Monitoring perilaku dan penanganan`}),(0,p.jsx)(`li`,{children:`Rekap data yang tertata dengan baik`})]})]})}),(0,p.jsxs)(`div`,{className:`login-card`,children:[(0,p.jsxs)(`div`,{className:`login-brand`,children:[(0,p.jsx)(`div`,{className:`school-badge`,children:`BK`}),(0,p.jsx)(`h2`,{children:`Login Aplikasi BK`}),(0,p.jsx)(`p`,{children:`MTsN 1 Mojokerto | Sistem Catatan Anekdot`})]}),(0,p.jsxs)(`form`,{className:`login-form`,onSubmit:async r=>{r.preventDefault(),s(!0);try{let r=await t({action:`login`,username:n,password:i},`Login`);r.success?e({username:r.username,role:r.role}):alert(r.message||`Login gagal.`)}catch(e){console.error(`Login error:`,e),alert(`Terjadi kesalahan koneksi.\n${e.message}`)}finally{s(!1)}},children:[(0,p.jsxs)(`div`,{className:`login-field`,children:[(0,p.jsx)(`label`,{htmlFor:`username`,children:`Username`}),(0,p.jsx)(`input`,{id:`username`,className:`login-input`,required:!0,type:`text`,value:n,onChange:e=>r(e.target.value)})]}),(0,p.jsxs)(`div`,{className:`login-field`,children:[(0,p.jsx)(`label`,{htmlFor:`password`,children:`Password`}),(0,p.jsx)(`input`,{id:`password`,className:`login-input`,required:!0,type:`password`,value:i,onChange:e=>a(e.target.value)})]}),(0,p.jsx)(`button`,{className:`login-button`,type:`submit`,disabled:o,children:o?`Memproses...`:`Login`})]})]})]})})]})}function h(e){let t=(0,f.c)(3),{onLogin:n,postToGas:r}=e,i;return t[0]!==n||t[1]!==r?(i=(0,p.jsx)(m,{onLogin:n,postToGas:r}),t[0]=n,t[1]=r,t[2]=i):i=t[2],i}var g=e(c());function _(e){let t=(0,g.c)(10),{label:n,value:r,meta:i}=e,a;t[0]===n?a=t[1]:(a=(0,p.jsx)(`span`,{className:`stat-label`,children:n}),t[0]=n,t[1]=a);let o;t[2]===r?o=t[3]:(o=(0,p.jsx)(`p`,{className:`stat-value`,children:r}),t[2]=r,t[3]=o);let s;t[4]===i?s=t[5]:(s=(0,p.jsx)(`span`,{className:`stat-meta`,children:i}),t[4]=i,t[5]=s);let c;return t[6]!==a||t[7]!==o||t[8]!==s?(c=(0,p.jsxs)(`div`,{className:`stat-card`,children:[a,o,s]}),t[6]=a,t[7]=o,t[8]=s,t[9]=c):c=t[9],c}var v=e(c());function y(e){let t=(0,v.c)(16),{label:n,onClick:r,variant:i,loading:a,disabled:o}=e,s=i===void 0?`default`:i,c=a===void 0?!1:a,l=o===void 0?!1:o,u;t[0]===n?u=t[1]:(u=typeof n==`string`?{text:n}:n,t[0]=n,t[1]=u);let d=u,f=`export-button ${s===`excel`?`excel-button`:s===`pdf`?`pdf-button`:s===`import`?`import-button`:`default-button`}`,m=l||c,h=c?`true`:`false`,g=`button-icon ${c?`is-loading`:``}`,_=c?`⏳`:d.icon||`•`,y;t[2]!==g||t[3]!==_?(y=(0,p.jsx)(`span`,{className:g,"aria-hidden":`true`,children:_}),t[2]=g,t[3]=_,t[4]=y):y=t[4];let b=c?d.loadingText||`Memproses...`:d.text,x;t[5]===b?x=t[6]:(x=(0,p.jsx)(`span`,{children:b}),t[5]=b,t[6]=x);let S;t[7]!==x||t[8]!==y?(S=(0,p.jsxs)(`span`,{className:`button-content`,children:[y,x]}),t[7]=x,t[8]=y,t[9]=S):S=t[9];let C;return t[10]!==f||t[11]!==r||t[12]!==S||t[13]!==m||t[14]!==h?(C=(0,p.jsx)(`button`,{type:`button`,className:f,onClick:r,disabled:m,"aria-busy":h,children:S}),t[10]=f,t[11]=r,t[12]=S,t[13]=m,t[14]=h,t[15]=C):C=t[15],C}async function b(e,t,n=`Sheet1`){if(!Array.isArray(e)||e.length===0)throw Error(`Belum ada data yang bisa diekspor.`);let r=await o(()=>import(`./xlsx-Dx3HtQZX.js`),__vite__mapDeps([0,1])),i=r.utils.aoa_to_sheet(e),a=r.utils.book_new();r.utils.book_append_sheet(a,i,n),r.writeFile(a,t)}async function x(e){if(!e)throw Error(`File Excel belum dipilih.`);let t=await o(()=>import(`./xlsx-Dx3HtQZX.js`),__vite__mapDeps([0,1])),n=await e.arrayBuffer(),r=t.read(n,{type:`array`}),i=r.SheetNames[0];if(!i)throw Error(`File Excel tidak memiliki sheet yang valid.`);let a=r.Sheets[i],s=t.utils.sheet_to_json(a,{defval:``,raw:!1});if(!Array.isArray(s)||s.length===0)throw Error(`File Excel tidak berisi data.`);return s}var S=e=>String(e??``).trim().toLowerCase().replace(/[^a-z0-9]/g,``),C=e=>{if(!e)return``;if(typeof e==`number`&&Number.isFinite(e)){let t=new Date(Date.UTC(1899,11,30));return new Date(t.getTime()+e*864e5).toISOString().slice(0,10)}if(e instanceof Date)return e.toISOString().slice(0,10);if(typeof e==`string`){let t=e.trim();if(!t)return``;let n=new Date(t);if(!Number.isNaN(n.getTime()))return n.toISOString().slice(0,10);let r=t.match(/^(\d{1,2})[/-](\d{1,2})[/-](\d{2,4})$/);if(r){let[,e,t,n]=r,i=n.length===2?`20${n}`:n,a=new Date(`${i}-${t.padStart(2,`0`)}-${e.padStart(2,`0`)}`);if(!Number.isNaN(a.getTime()))return a.toISOString().slice(0,10)}return t}return String(e).trim()},w=e=>{let t={};return Object.entries(e||{}).forEach(([e,n])=>{let r=S(e),i=n==null?``:String(n).trim();!r||!i||(r.includes(`tanggal`)?t.Tanggal=C(n):r.includes(`namasiswa`)||r.includes(`siswa`)?t.NamaSiswa=i:r.includes(`kelas`)?t.Kelas=i:r.includes(`kejadian`)||r.includes(`perilaku`)?t.Kejadian=i:r.includes(`penanganan`)||r.includes(`tindaklanjut`)?t.Penanganan=i:r.includes(`keterangan`)&&(t.Keterangan=i))}),{ID:``,Tanggal:t.Tanggal||``,NamaSiswa:t.NamaSiswa||``,Kelas:t.Kelas||``,Kejadian:t.Kejadian||``,Penanganan:t.Penanganan||``,Keterangan:t.Keterangan||``}};function T({user:e,onLogout:t,postToGas:n}){let[r,i]=(0,d.useState)([]),[a,o]=(0,d.useState)(!0),[s,c]=(0,d.useState)(!1),[l,u]=(0,d.useState)(!1),[f,m]=(0,d.useState)({ID:``,Tanggal:``,NamaSiswa:``,Kelas:``,Kejadian:``,Penanganan:``,Keterangan:``}),[h,g]=(0,d.useState)(!1),[v,S]=(0,d.useState)(!1),C=(0,d.useRef)(null),T=a||s||l,E=()=>{m({ID:``,Tanggal:``,NamaSiswa:``,Kelas:``,Kejadian:``,Penanganan:``,Keterangan:``}),g(!1),S(!1)},D=async()=>{o(!0);try{let e=await n({action:`read`},`Memuat data`);e.success?i(e.data||[]):alert(e.message||`Gagal memuat data.`)}catch(e){console.error(`Fetch records error:`,e),alert(`Terjadi kesalahan koneksi.\n${e.message}`)}finally{o(!1)}};(0,d.useEffect)(()=>{D()},[]);let O=e=>{m({...f,[e.target.name]:e.target.value})},k=async e=>{e.preventDefault();let t=h?`update`:`create`;o(!0);try{let e=await n({action:t,payload:f},h?`Update data`:`Simpan data`);e.success===!1?alert(e.message||`Gagal menyimpan data`):(E(),await D())}catch(e){console.error(`Save data error:`,e),alert(`Terjadi kesalahan saat menyimpan data.\n${e.message}`)}finally{o(!1)}},A=e=>{if(!e)return``;let t=new Date(e);if(!Number.isNaN(t.getTime())){let e=t.getFullYear(),n=String(t.getMonth()+1).padStart(2,`0`),r=String(t.getDate()).padStart(2,`0`);return`${e}-${n}-${r}`}return``},j=()=>{S(!0)},M=()=>{E()},N=e=>{m({...e,Tanggal:A(e.Tanggal)}),g(!0),S(!0)},P=async e=>{if(window.confirm(`Yakin ingin menghapus catatan ini?`)){o(!0);try{let t=await n({action:`delete`,id:e},`Hapus data`);t.success===!1?alert(t.message||`Gagal menghapus data.`):await D()}catch(e){console.error(`Delete data error:`,e),alert(`Terjadi kesalahan saat menghapus data.\n${e.message}`)}finally{o(!1)}}},F=()=>{E()},I=e=>{let t=new Date,n=t.getFullYear(),r=String(t.getMonth()+1).padStart(2,`0`),i=String(t.getDate()).padStart(2,`0`);return`catatan-anekdot-${n}-${r}-${i}.${e}`},L=()=>r.map(e=>[e.Tanggal?A(e.Tanggal):``,e.NamaSiswa||``,e.Kelas||``,e.Kejadian||``,e.Penanganan||``,e.Keterangan||``]);return(0,p.jsxs)(p.Fragment,{children:[(0,p.jsx)(`style`,{children:`
        * { box-sizing: border-box; }
        body {
          margin: 0;
          background: #f3f7fb;
        }
        .app-page {
          min-height: 100vh;
          padding: 28px 24px 32px;
          background:
            radial-gradient(circle at top left, rgba(16,42,67,0.12), transparent 28%),
            radial-gradient(circle at bottom right, rgba(212,167,60,0.12), transparent 25%),
            linear-gradient(135deg, #f4f8fc 0%, #edf8f3 100%);
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          color: #1f2937;
        }
        .app-shell {
          max-width: 1280px;
          margin: 0 auto;
        }
        .topbar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 18px;
          background: linear-gradient(135deg, #102a43 0%, #14486d 100%);
          border-radius: 24px;
          padding: 20px 24px;
          box-shadow: 0 22px 50px rgba(16,42,67,0.2);
          position: relative;
          overflow: hidden;
        }
        .topbar::before {
          content: "";
          position: absolute;
          width: 180px;
          height: 180px;
          border-radius: 50%;
          background: rgba(212,167,60,0.14);
          right: -24px;
          top: -34px;
        }
        .brand-wrap {
          display: flex;
          align-items: center;
          gap: 14px;
          position: relative;
          z-index: 1;
        }
        .school-logo {
          width: 52px;
          height: 52px;
          border-radius: 14px;
          background: linear-gradient(135deg, #d4a73c, #b98518);
          color: #102a43;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.2rem;
          font-weight: 800;
          box-shadow: 0 12px 24px rgba(212,167,60,0.3);
        }
        .brand-title {
          margin: 0;
          color: #ffffff;
          font-size: clamp(1.5rem, 2vw, 2.2rem);
        }
        .brand-subtitle {
          display: block;
          color: rgba(255,255,255,0.78);
          font-size: 0.8rem;
          letter-spacing: 0.06em;
          text-transform: uppercase;
        }
        .topbar-right {
          display: flex;
          align-items: center;
          gap: 12px;
          flex-wrap: wrap;
          justify-content: flex-end;
          position: relative;
          z-index: 1;
        }
        .user-pill {
          padding: 9px 14px;
          border-radius: 999px;
          background: rgba(255,255,255,0.14);
          border: 1px solid rgba(255,255,255,0.18);
          color: #f8fafc;
          font-weight: 600;
          font-size: 0.88rem;
        }
        .logout-button,
        .table-action,
        .primary-button,
        .secondary-button,
        .danger-button,
        .modal-close,
        .export-button {
          border: none;
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.2s ease;
          font-weight: 700;
        }
        .logout-button {
          padding: 10px 16px;
          background: linear-gradient(135deg, #d64545, #b42318);
          color: white;
          box-shadow: 0 12px 20px rgba(212,69,69,0.2);
        }
        .logout-button:hover,
        .primary-button:hover,
        .secondary-button:hover,
        .danger-button:hover,
        .table-action:hover,
        .export-button:hover,
        .save-button:hover,
        .modal-close:hover {
          transform: translateY(-1px);
          filter: brightness(0.98);
        }
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(180px, 1fr));
          gap: 18px;
          margin-top: 20px;
        }
        .stat-card {
          background: rgba(255,255,255,0.9);
          border: 1px solid rgba(148, 163, 184, 0.15);
          border-left: 5px solid #d4a73c;
          border-radius: 20px;
          box-shadow: 0 18px 35px rgba(15, 23, 42, 0.06);
          padding: 16px 18px;
        }
        .stat-label {
          display: block;
          font-size: 0.78rem;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: #64748b;
          margin-bottom: 8px;
        }
        .stat-value {
          font-size: clamp(1.5rem, 2vw, 2.1rem);
          font-weight: 800;
          color: #102a43;
          margin: 0;
        }
        .stat-meta {
          display: inline-block;
          margin-top: 8px;
          font-size: 0.8rem;
          color: #0f766e;
          font-weight: 600;
        }
        .panel {
          margin-top: 22px;
          background: rgba(255,255,255,0.9);
          border-radius: 24px;
          border: 1px solid rgba(148, 163, 184, 0.18);
          box-shadow: 0 22px 40px rgba(15, 23, 42, 0.07);
          padding: 24px 20px 18px;
        }
        .panel-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 18px;
          margin-bottom: 18px;
        }
        .panel-header h3 {
          margin: 0;
          font-size: clamp(1.2rem, 1.7vw, 1.7rem);
          color: #102a43;
        }
        .panel-actions {
          display: flex;
          align-items: center;
          gap: 10px;
          flex-wrap: wrap;
          justify-content: flex-end;
        }
        .primary-button,
        .export-button {
          padding: 12px 18px;
          border-radius: 12px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.2s ease;
          border: 1px solid transparent;
          font-size: 0.92rem;
          box-shadow: 0 10px 22px rgba(15, 23, 42, 0.08);
        }
        .primary-button {
          background: linear-gradient(135deg, #0f766e, #0b5e64);
          color: white;
          box-shadow: 0 14px 26px rgba(15,118,110,0.24);
        }
        .export-button {
          min-width: 132px;
          min-height: 48px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #f8fbff, #edf4ff);
          color: #1e3a5f;
          border-color: rgba(148, 163, 184, 0.35);
          box-shadow: 0 8px 18px rgba(37, 99, 235, 0.08);
        }
        .export-button.default-button,
        .export-button.import-button {
          background: linear-gradient(135deg, #eff6ff, #dbeafe);
          color: #1d4ed8;
          border-color: rgba(96, 165, 250, 0.45);
        }
        .export-button.pdf-button {
          background: linear-gradient(135deg, #f8fafc, #e2e8f0);
          color: #334155;
          border-color: rgba(148, 163, 184, 0.35);
        }
        .export-button.excel-button {
          background: linear-gradient(135deg, #ecfdf5, #d1fae5);
          color: #166534;
          border-color: rgba(34, 197, 94, 0.3);
        }
        .export-button:disabled,
        .primary-button:disabled {
          opacity: 0.72;
          cursor: not-allowed;
          transform: none;
          box-shadow: none;
        }
        .button-content {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          width: 100%;
          font-weight: 700;
        }
        .button-icon {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 18px;
          height: 18px;
          border-radius: 6px;
          font-size: 0.95rem;
          transition: transform 0.2s ease;
        }
        .button-icon.is-loading {
          animation: spin 0.8s linear infinite;
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        .table-wrap {
          width: 100%;
          overflow-x: auto;
          border-radius: 18px;
          border: 1px solid #dfeaf2;
          background: #fff;
        }
        table {
          width: 100%;
          border-collapse: collapse;
          min-width: 1160px;
          table-layout: fixed;
          background: #fff;
        }
        thead th {
          text-align: left;
          background: linear-gradient(135deg, #e9f1f8, #dfeef7);
          color: #102a43;
          padding: 14px 12px;
          font-weight: 800;
          border-bottom: 1px solid #dbe6ef;
          vertical-align: middle;
        }
        thead th:nth-child(1) { width: 120px; }
        thead th:nth-child(2) { width: 170px; }
        thead th:nth-child(3) { width: 120px; }
        thead th:nth-child(4), thead th:nth-child(5) { width: 260px; }
        thead th:nth-child(6) { width: 180px; }
        tbody td {
          padding: 12px;
          border-bottom: 1px solid #edf2f7;
          vertical-align: top;
          color: #334155;
          line-height: 1.55;
        }
        tbody tr:nth-child(even) {
          background: rgba(248,250,252,0.92);
        }
        tbody tr:hover {
          background: rgba(236,249,255,0.65);
        }
        .table-actions {
          display: flex;
          align-items: center;
          justify-content: flex-start;
          gap: 8px;
          flex-wrap: wrap;
          min-width: 160px;
        }
        .table-action,
        .danger-button {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          padding: 9px 12px;
          border-radius: 12px;
          font-size: 0.82rem;
          line-height: 1;
          width: 104px;
          min-width: 104px;
          flex: 0 0 104px;
          border: 1px solid rgba(148, 163, 184, 0.2);
          box-shadow: 0 8px 18px rgba(15, 23, 42, 0.06);
        }
        .table-action {
          background: linear-gradient(135deg, #f8fafc, #e2e8f0);
          color: #0f172a;
        }
        .danger-button {
          background: linear-gradient(135deg, #f87171, #dc2626);
          color: white;
          border-color: rgba(153, 27, 27, 0.18);
          box-shadow: 0 10px 20px rgba(220, 38, 38, 0.18);
        }
        .table-text {
          max-width: 260px;
          white-space: normal;
          word-break: break-word;
          line-height: 1.55;
        }
        .status-text {
          color: #475569;
          font-weight: 600;
        }
        .modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(15, 23, 42, 0.6);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          z-index: 1000;
        }
        .modal-card {
          width: 100%;
          max-width: 640px;
          max-height: calc(100vh - 40px);
          display: flex;
          flex-direction: column;
          overflow-y: auto;
          background: rgba(255, 255, 255, 0.96);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(148, 163, 184, 0.18);
          border-top: 6px solid #d4a73c;
          border-radius: 28px;
          padding: 0;
          box-shadow: 0 30px 80px rgba(15, 23, 42, 0.22);
          overscroll-behavior: contain;
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
        .modal-card::-webkit-scrollbar {
          display: none;
        }
        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 12px;
          padding: 22px 22px 16px;
          border-bottom: 1px solid rgba(148, 163, 184, 0.18);
          background: linear-gradient(135deg, rgba(16,42,67,0.98), rgba(20,72,109,0.98));
          box-shadow: inset 0 -1px 0 rgba(255,255,255,0.06);
        }
        .modal-header h3 {
          margin: 0;
          color: #ffffff;
          font-size: 1.45rem;
          letter-spacing: 0.01em;
        }
        .modal-close {
          width: 38px;
          height: 38px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background: rgba(255,255,255,0.14);
          color: #ffffff;
          font-size: 1.5rem;
          border-radius: 12px;
          border: 1px solid rgba(255,255,255,0.18);
          box-shadow: 0 8px 16px rgba(15, 23, 42, 0.12);
        }
        .modal-body {
          padding: 20px 22px 18px;
        }
        .modal-form {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }
        .field-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 14px;
        }
        .field-group {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .field-group.full {
          grid-column: 1 / -1;
        }
        .field-group label {
          font-size: 0.9rem;
          font-weight: 700;
          color: #334155;
        }
        .form-input,
        .form-textarea {
          width: 100%;
          padding: 12px 14px;
          border-radius: 12px;
          border: 1px solid #d6e1eb;
          background: #f8fafc;
          font-size: 0.96rem;
          color: #102a43;
          resize: vertical;
          transition: all 0.2s ease;
          box-shadow: inset 0 1px 2px rgba(15, 23, 42, 0.04);
        }
        .form-input:focus,
        .form-textarea:focus {
          outline: none;
          border-color: #0f766e;
          box-shadow: 0 0 0 4px rgba(15,118,110,0.12), inset 0 1px 2px rgba(15, 23, 42, 0.04);
          background: #fff;
        }
        .button-row {
          display: flex;
          gap: 10px;
          margin-top: 8px;
          padding-top: 12px;
          border-top: 1px solid rgba(148, 163, 184, 0.18);
        }
        .secondary-button {
          flex: 1;
          padding: 12px 14px;
          background: linear-gradient(135deg, #f8fafc, #e2e8f0);
          color: #0f172a;
          border: 1px solid rgba(148, 163, 184, 0.22);
          box-shadow: 0 10px 18px rgba(15, 23, 42, 0.04);
        }
        .save-button {
          flex: 1;
          padding: 12px 14px;
          border: none;
          border-radius: 12px;
          background: linear-gradient(135deg, #16a34a, #15803d);
          color: white;
          cursor: pointer;
          box-shadow: 0 12px 22px rgba(22,163,74,0.2);
        }
        @media (max-width: 768px) {
          .app-page {
            padding: 18px 14px 26px;
          }
          .topbar,
          .panel-header {
            flex-direction: column;
            align-items: flex-start;
          }
          .brand-wrap {
            width: 100%;
          }
          .topbar-right {
            width: 100%;
            justify-content: space-between;
          }
          .panel-actions {
            width: 100%;
            justify-content: stretch;
          }
          .panel-actions > * {
            flex: 1 1 140px;
          }
          .stats-grid {
            grid-template-columns: 1fr;
          }
          .field-grid {
            grid-template-columns: 1fr;
          }
          .button-row {
            flex-direction: column;
          }
          .modal-card {
            max-height: calc(100vh - 20px);
          }
          .modal-header,
          .modal-body {
            padding-left: 16px;
            padding-right: 16px;
          }
        }
        @media print {
          body * {
            visibility: hidden;
          }
          .app-page,
          .app-page * {
            visibility: visible;
          }
          .topbar,
          .stats-grid,
          .panel-actions,
          .logout-button,
          .table-actions {
            display: none !important;
          }
          .app-page {
            background: white;
            padding: 0;
          }
          .panel {
            box-shadow: none;
            border: none;
            padding: 0;
            margin: 0;
          }
          .table-wrap {
            overflow: visible;
            border: 1px solid #dfeaf2;
          }
          table {
            min-width: 100% !important;
          }
        }
      `}),(0,p.jsxs)(`div`,{className:`app-page`,children:[(0,p.jsxs)(`div`,{className:`app-shell`,children:[(0,p.jsxs)(`div`,{className:`topbar`,children:[(0,p.jsxs)(`div`,{className:`brand-wrap`,children:[(0,p.jsx)(`div`,{className:`school-logo`,children:`BK`}),(0,p.jsxs)(`div`,{children:[(0,p.jsx)(`h2`,{className:`brand-title`,children:`Catatan Anekdot BK`}),(0,p.jsx)(`span`,{className:`brand-subtitle`,children:`MTsN 1 Mojokerto`})]})]}),(0,p.jsxs)(`div`,{className:`topbar-right`,children:[(0,p.jsxs)(`span`,{className:`user-pill`,children:[`Halo, `,e.username,` (`,e.role,`)`]}),(0,p.jsx)(`button`,{className:`logout-button`,onClick:t,children:`Logout`})]})]}),(0,p.jsxs)(`div`,{className:`stats-grid`,children:[(0,p.jsx)(_,{label:`Total Catatan`,value:r.length,meta:`Data aktif`}),(0,p.jsx)(_,{label:`Siswa Terdata`,value:new Set(r.map(e=>e.NamaSiswa)).size,meta:`Unique siswa`}),(0,p.jsx)(_,{label:`Status Sistem`,value:`Online`,meta:`Siap digunakan`})]}),(0,p.jsxs)(`div`,{className:`panel`,children:[(0,p.jsxs)(`div`,{className:`panel-header`,children:[(0,p.jsx)(`h3`,{children:`Daftar Catatan Anekdot`}),(0,p.jsxs)(`div`,{className:`panel-actions`,children:[(0,p.jsx)(`input`,{ref:C,type:`file`,accept:`.xlsx,.xls`,hidden:!0,onChange:async e=>{let t=e.target.files?.[0];if(t){if(!/\.(xlsx|xls)$/i.test(t.name)){alert(`File yang didukung hanya .xlsx atau .xls`),e.target.value=``;return}u(!0);try{let e=(await x(t)).map(w).filter(e=>e.NamaSiswa||e.Kelas||e.Kejadian||e.Penanganan||e.Keterangan||e.Tanggal);if(!e.length){alert(`File Excel tidak berisi data yang valid untuk diimpor.`);return}for(let t of e)await n({action:`create`,payload:t},`Impor data Excel`);await D(),alert(`${e.length} data berhasil diimpor dari file Excel.`)}catch(e){console.error(`Import Excel error:`,e),alert(e.message||`Gagal mengimpor file Excel.`)}finally{u(!1),e.target.value=``}}}}),(0,p.jsx)(y,{label:{icon:`📥`,text:`Import`,loadingText:`Mengimpor...`},variant:`import`,loading:l,disabled:T,onClick:()=>C.current?.click()}),(0,p.jsx)(y,{label:{icon:`📄`,text:`PDF`,loadingText:`Membuat PDF...`},variant:`pdf`,loading:s,disabled:T,onClick:async()=>{if(!r.length){alert(`Belum ada data yang bisa diekspor.`);return}c(!0);try{let e=L().map(e=>`
          <tr>
            ${e.map(e=>`<td>${String(e).replace(/</g,`&lt;`).replace(/>/g,`&gt;`)}</td>`).join(``)}
          </tr>
        `).join(``),t=window.open(``,`_blank`,`width=1200,height=900`);if(!t)throw Error(`Pop-up diblokir. Izinkan pop-up untuk mengekspor PDF.`);let n=new Date().toLocaleDateString(`id-ID`,{day:`2-digit`,month:`long`,year:`numeric`});t.document.write(`
        <!doctype html>
        <html>
          <head>
            <meta charset="utf-8" />
            <title>Catatan Anekdot BK</title>
            <style>
              body {
                font-family: Arial, sans-serif;
                margin: 32px;
                color: #102a43;
                background: #ffffff;
              }
              .report-header {
                border-bottom: 3px solid #102a43;
                padding-bottom: 14px;
                margin-bottom: 18px;
              }
              .report-title {
                font-size: 28px;
                font-weight: 700;
                margin: 0;
              }
              .report-subtitle {
                font-size: 13px;
                color: #475569;
                margin-top: 6px;
              }
              table {
                width: 100%;
                border-collapse: collapse;
                margin-top: 18px;
                font-size: 12px;
              }
              th, td {
                border: 1px solid #cbd5e1;
                padding: 8px 10px;
                text-align: left;
                vertical-align: top;
              }
              th {
                background: #e2e8f0;
                font-weight: 700;
              }
              .report-meta {
                margin-top: 12px;
                font-size: 12px;
                color: #334155;
              }
              @media print { body { margin: 0; } }
            </style>
          </head>
          <body>
            <div class="report-header">
              <div class="report-title">Catatan Anekdot BK</div>
              <div class="report-subtitle">MTsN 1 Mojokerto</div>
            </div>
            <div class="report-meta">
              <strong>Tanggal cetak:</strong> ${n}
            </div>
            <table>
              <thead>
                <tr>
                  <th>Tanggal</th>
                  <th>Nama Siswa</th>
                  <th>Kelas</th>
                  <th>Kejadian</th>
                  <th>Penanganan</th>
                  <th>Keterangan</th>
                </tr>
              </thead>
              <tbody>
                ${e}
              </tbody>
            </table>
          </body>
        </html>
      `),t.document.close(),t.focus(),setTimeout(()=>{t.print()},300)}catch(e){console.error(`Export PDF error:`,e),alert(e.message||`Gagal mengekspor file PDF.`)}finally{setTimeout(()=>c(!1),350)}}}),(0,p.jsx)(y,{label:{icon:`📊`,text:`Excel`,loadingText:`Mengekspor...`},variant:`excel`,loading:s,disabled:T,onClick:async()=>{if(!r.length){alert(`Belum ada data yang bisa diekspor.`);return}c(!0);try{let e=[[`Tanggal`,`Nama Siswa`,`Kelas`,`Kejadian`,`Penanganan`,`Keterangan`],...L()];await b(e,I(`xlsx`),`Catatan Anekdot`)}catch(e){console.error(`Export Excel error:`,e),alert(e.message||`Gagal mengekspor file Excel.`)}finally{c(!1)}}}),(0,p.jsx)(`button`,{type:`button`,className:`primary-button`,onClick:j,children:`+ Tambah Catatan`})]})]}),a?(0,p.jsx)(`p`,{className:`status-text`,children:`Memuat data...`}):(0,p.jsx)(`div`,{className:`table-wrap`,children:(0,p.jsxs)(`table`,{children:[(0,p.jsx)(`thead`,{children:(0,p.jsxs)(`tr`,{children:[(0,p.jsx)(`th`,{children:`Tanggal`}),(0,p.jsx)(`th`,{children:`Siswa`}),(0,p.jsx)(`th`,{children:`Kelas`}),(0,p.jsx)(`th`,{children:`Kejadian`}),(0,p.jsx)(`th`,{children:`Tindak Lanjut`}),(0,p.jsx)(`th`,{children:`Aksi`})]})}),(0,p.jsx)(`tbody`,{children:r.map((t,n)=>(0,p.jsxs)(`tr`,{children:[(0,p.jsx)(`td`,{children:A(t.Tanggal)}),(0,p.jsx)(`td`,{children:t.NamaSiswa}),(0,p.jsx)(`td`,{children:t.Kelas}),(0,p.jsx)(`td`,{className:`table-text`,children:t.Kejadian}),(0,p.jsx)(`td`,{className:`table-text`,children:t.Penanganan}),(0,p.jsx)(`td`,{children:(0,p.jsxs)(`div`,{className:`table-actions`,children:[(0,p.jsx)(`button`,{type:`button`,className:`table-action`,onClick:()=>N(t),children:`✏️ Edit`}),e.role===`superuser`&&(0,p.jsx)(`button`,{type:`button`,className:`danger-button`,onClick:()=>P(t.ID),children:`🗑️ Hapus`})]})})]},n))})]})})]})]}),v&&(0,p.jsx)(`div`,{className:`modal-overlay`,children:(0,p.jsxs)(`div`,{className:`modal-card`,children:[(0,p.jsxs)(`div`,{className:`modal-header`,children:[(0,p.jsx)(`h3`,{children:h?`Edit Catatan`:`Tambah Catatan Baru`}),(0,p.jsx)(`button`,{type:`button`,className:`modal-close`,onClick:M,children:`×`})]}),(0,p.jsx)(`div`,{className:`modal-body`,children:(0,p.jsxs)(`form`,{className:`modal-form`,onSubmit:k,children:[(0,p.jsxs)(`div`,{className:`field-grid`,children:[(0,p.jsxs)(`div`,{className:`field-group`,children:[(0,p.jsx)(`label`,{children:`Tanggal`}),(0,p.jsx)(`input`,{className:`form-input`,type:`date`,name:`Tanggal`,value:f.Tanggal,onChange:O,required:!0})]}),(0,p.jsxs)(`div`,{className:`field-group`,children:[(0,p.jsx)(`label`,{children:`Kelas`}),(0,p.jsx)(`input`,{className:`form-input`,type:`text`,name:`Kelas`,value:f.Kelas,onChange:O,required:!0})]})]}),(0,p.jsxs)(`div`,{className:`field-group full`,children:[(0,p.jsx)(`label`,{children:`Nama Siswa`}),(0,p.jsx)(`input`,{className:`form-input`,type:`text`,name:`NamaSiswa`,value:f.NamaSiswa,onChange:O,required:!0})]}),(0,p.jsxs)(`div`,{className:`field-group full`,children:[(0,p.jsx)(`label`,{children:`Kejadian / Perilaku`}),(0,p.jsx)(`textarea`,{className:`form-textarea`,name:`Kejadian`,value:f.Kejadian,onChange:O,required:!0,rows:`3`})]}),(0,p.jsxs)(`div`,{className:`field-group full`,children:[(0,p.jsx)(`label`,{children:`Tindak Lanjut / Penanganan`}),(0,p.jsx)(`textarea`,{className:`form-textarea`,name:`Penanganan`,value:f.Penanganan,onChange:O,required:!0,rows:`3`})]}),(0,p.jsxs)(`div`,{className:`field-group full`,children:[(0,p.jsx)(`label`,{children:`Keterangan`}),(0,p.jsx)(`input`,{className:`form-input`,type:`text`,name:`Keterangan`,value:f.Keterangan,onChange:O})]}),(0,p.jsxs)(`div`,{className:`button-row`,children:[(0,p.jsx)(`button`,{type:`submit`,disabled:a,className:`save-button`,children:a?`Menyimpan...`:`Simpan Catatan`}),(0,p.jsx)(`button`,{type:`button`,className:`secondary-button`,onClick:F,children:h?`Batal Edit`:`Tutup`})]})]})})]})})]})]})}var E=e(c());function D(e){let t=(0,E.c)(4),{user:n,onLogout:r,postToGas:i}=e,a;return t[0]!==r||t[1]!==i||t[2]!==n?(a=(0,p.jsx)(T,{user:n,onLogout:r,postToGas:i}),t[0]=r,t[1]=i,t[2]=n,t[3]=a):a=t[3],a}var O=e(c()),k=`https://script.google.com/macros/s/AKfycby4No_Yd3lOZ90h4SnwFEohUD_99_q3khqsb8raPeUCQl7bX63R81FCjueejU--GP1O/exec`,A=async(e,t=`permintaan`)=>{let n=await fetch(k,{method:`POST`,body:JSON.stringify(e)}),r=await n.text(),i={};if(r)try{i=JSON.parse(r)}catch{throw Error(`${t} gagal: server mengembalikan format bukan JSON. Status: ${n.status}. Detail: ${r.slice(0,200)}`)}if(!n.ok)throw Error(`${t} gagal. Status: ${n.status}. ${i.message||r||`Server tidak merespons.`}`);return i},j=`bk-user`,M=()=>{try{let e=sessionStorage.getItem(j);return e?JSON.parse(e):null}catch{return null}};function N(){let e=(0,O.c)(16),[n,i]=(0,d.useState)(P),o,c;e[0]===n?(o=e[1],c=e[2]):(o=()=>{n?sessionStorage.setItem(j,JSON.stringify(n)):sessionStorage.removeItem(j)},c=[n],e[0]=n,e[1]=o,e[2]=c),(0,d.useEffect)(o,c);let l=n?`/dashboard`:`/login`,u;e[3]===l?u=e[4]:(u=(0,p.jsx)(r,{path:`/`,element:(0,p.jsx)(s,{to:l,replace:!0})}),e[3]=l,e[4]=u);let f;e[5]===n?f=e[6]:(f=(0,p.jsx)(r,{path:`/login`,element:n?(0,p.jsx)(s,{to:`/dashboard`,replace:!0}):(0,p.jsx)(h,{onLogin:i,postToGas:A})}),e[5]=n,e[6]=f);let m;e[7]===n?m=e[8]:(m=(0,p.jsx)(r,{path:`/dashboard`,element:n?(0,p.jsx)(D,{user:n,onLogout:()=>i(null),postToGas:A}):(0,p.jsx)(s,{to:`/login`,replace:!0})}),e[7]=n,e[8]=m);let g=n?`/dashboard`:`/login`,_;e[9]===g?_=e[10]:(_=(0,p.jsx)(r,{path:`*`,element:(0,p.jsx)(s,{to:g,replace:!0})}),e[9]=g,e[10]=_);let v;return e[11]!==u||e[12]!==f||e[13]!==m||e[14]!==_?(v=(0,p.jsx)(a,{children:(0,p.jsxs)(t,{children:[u,f,m,_]})}),e[11]=u,e[12]=f,e[13]=m,e[14]=_,e[15]=v):v=e[15],v}function P(){return M()}(0,u.createRoot)(document.getElementById(`root`)).render((0,p.jsx)(d.StrictMode,{children:(0,p.jsx)(N,{})}));