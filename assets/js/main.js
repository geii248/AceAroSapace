(function() {
    "use strict";
const qs=(s,r=document)=>r.querySelector(s),qsa=(s,r=document)=>Array.from(r.querySelectorAll(s));
function setupNav() {
        qsa(".navbar-toggler").forEach(b=>b.addEventListener("click",()=> {
            const t=qs(b.getAttribute("data-bs-target"));if(t) {
                t.classList.toggle("show");b.setAttribute("aria-expanded",String(t.classList.contains("show")));
            }
        }
        ));
    }
    function setupTheme() {
        qsa("[data-theme-toggle]").forEach(b=>b.addEventListener("click",()=> {
            document.body.classList.toggle("high-contrast");b.setAttribute("aria-pressed",String(document.body.classList.contains("high-contrast")));
        }
        ));
    }
    window.filterTopics=function() {
        const i=qs("#siteSearch"),q=(i?.value||"").toLowerCase().trim(),cards=qsa(".searchable");let n=0;cards.forEach(c=> {
            const ok=!q||c.innerText.toLowerCase().includes(q);c.classList.toggle("hidden-card",!ok);if(ok)n++;
        }
        );const count=qs("#resultCount");if(count)count.textContent=q?`${n} result${n===1?"":"s"} found`:`${cards.length} topics available`;
    }
    ;
function setupSearch() {
        const i=qs("#siteSearch");if(!i)return;i.addEventListener("input",window.filterTopics);qs("#searchButton")?.addEventListener("click",window.filterTopics);qs("#clearSearch")?.addEventListener("click",()=> {
            i.value="";window.filterTopics();i.focus();
        }
        );window.filterTopics();
    }
    function setupPathChooser() {
        const bs=qsa("[data-path]"),box=qs("#pathResult");if(!bs.length||!box)return;const d= {
            learn:["Start with the basics","Explore asexuality, aromanticism, attraction, and common terminology at your own pace.","category.html"],question:["It's okay to question","You do not need to choose a label immediately. Explore without pressure.","starter-page.html"],support:["Be a better ally","Learn how to listen, ask respectfully, avoid assumptions, and support different boundaries and identities.","author-profile.html"]
        }
        ;bs.forEach(b=>b.addEventListener("click",()=> {
            bs.forEach(x=>x.classList.remove("active"));b.classList.add("active");const x=d[b.dataset.path];box.innerHTML=`<strong>${x[0]}</strong><p class="mt-2">${x[1]}</p><a class="btn btn-primary" href="${x[2]}">Explore this path →</a>`;
        }
        ));
    }
    function setupTerms() {
        const box=qs("#termExplorer"),bs=qsa("[data-term]");if(!box||!bs.length)return;const d= {
            asexuality:["Asexuality","Asexuality commonly describes experiencing little to no sexual attraction. Experiences can vary across the ace spectrum."],aromanticism:["Aromanticism","Aromanticism commonly describes experiencing little to no romantic attraction. Experiences can vary across the aro spectrum."],aroace:["Aroace","A term used by people who identify as both aromantic and asexual."],acespec:["Ace-spec","An umbrella term for identities on the asexual spectrum."],arospec:["Aro-spec","An umbrella term for identities on the aromantic spectrum."],queerplatonic:["Queerplatonic","A relationship concept describing a committed bond that is not necessarily romantic or sexual."]
        }
        ;bs.forEach(b=>b.addEventListener("click",()=> {
            bs.forEach(x=>x.classList.remove("active"));b.classList.add("active");const x=d[b.dataset.term];box.innerHTML=`<strong>${x[0]}</strong><p class="mb-0 mt-2">${x[1]}</p>`;
        }
        ));
    }
    function setupQuiz() {
        const quiz=qs("#aceQuiz");if(!quiz)return;const data=[["Asexuality mainly describes a person's…",["sexual attraction","favorite relationship style","personality"],0],["Aromanticism mainly describes a person's…",["romantic attraction","gender identity","friendship skills"],0],["Aroace is commonly used for someone who identifies as…",["aromantic and asexual","romantic and sexual","questioning only"],0],["Which statement is most accurate?",["Labels can help people describe themselves, but they are not tests.","Everyone must choose a label.","A label determines someone's behavior."],0],["A respectful approach is to…",["let people describe their own identity and boundaries","assume a label means the same thing for everyone","pressure someone to explain their private life"],0]];let i=0,score=0,answered=false;const q=qs("#quizQuestion"),o=qs("#quizOptions"),next=qs("#quizNext"),p=qs("#quizProgress"),s=qs("#quizScore");function render() {
            answered=false;const d=data[i];q.textContent=d[0];o.innerHTML="";d[1].forEach((t,j)=> {
                const b=document.createElement("button");b.type="button";b.className="quiz-option";b.textContent=t;b.onclick=()=> {
                    if(answered)return;answered=true;if(j===d[2]) {
                        score++;b.classList.add("correct");
                    }
                    else {
                        b.classList.add("wrong");o.children[d[2]].classList.add("correct");
                    }
                    next.disabled=false;
                }
                ;o.appendChild(b);
            }
            );next.disabled=true;next.textContent=i===data.length-1?"See result":"Next question";p.style.width=(i/data.length*100)+"%";s.textContent=`Question ${i+1} of ${data.length}`;
        }
        next.onclick=()=> {
            if(!answered)return;if(i<data.length-1) {
                i++;render();
            }
            else {
                p.style.width="100%";q.textContent=`You scored ${score} / ${data.length}`;o.innerHTML='<div class="reveal-box"><strong>Keep exploring.</strong><p class="mb-0 mt-2">This quiz is for learning, not for assigning an identity.</p></div>';next.textContent="Restart quiz";next.disabled=false;next.onclick=()=> {
                    i=0;score=0;next.onclick=null;render();
                }
                ;
            }
        }
        ;render();
    }
    function setupPrompts() {
        const b=qs("#newPrompt"),o=qs("#promptOutput");if(!b||!o)return;const p=["What kind of connection feels meaningful to you?","What assumption about romance or attraction have you questioned?","What boundaries help people feel respected in relationships?","What does community look like outside of traditional dating?","What language helps you feel understood?"];let last=-1;b.onclick=()=> {
            let i=Math.floor(Math.random()*p.length);if(i===last)i=(i+1)%p.length;last=i;o.textContent=p[i];
        }
        ;
    }
    function setupReactions() {
        qsa("[data-reaction]").forEach(b=>b.onclick=()=> {
            const on=b.classList.toggle("active"),n=Number(b.dataset.count||0)+(on?1:-1);b.dataset.count=n;const c=qs(".reaction-count",b);if(c)c.textContent=n;
        }
        );
    }
    function setupFilters() {
        qsa("[data-filter-group]").forEach(g=> {
            const bs=qsa("[data-filter]",g),cards=qsa(`[data-filter-card="${g.dataset.filterGroup}"]`);bs.forEach(b=>b.onclick=()=> {
                bs.forEach(x=>x.classList.remove("active"));b.classList.add("active");cards.forEach(c=>c.classList.toggle("hidden-card",b.dataset.filter!=="all"&&c.dataset.category!==b.dataset.filter));
            }
            );
        }
        );
    }
    function setupFaq() {
        qsa(".faq-btn").forEach(b=>b.onclick=()=> {
            const item=b.closest(".faq-item"),open=item.classList.toggle("open");b.setAttribute("aria-expanded",String(open));const i=qs("i",b);if(i)i.className=open?"bi bi-dash-circle":"bi bi-plus-circle";
        }
        );
    }
    document.addEventListener("DOMContentLoaded",()=> {
        setupNav();setupTheme();setupSearch();setupPathChooser();setupTerms();setupQuiz();setupPrompts();setupReactions();setupFilters();setupFaq();
    }
    );
}
)();
