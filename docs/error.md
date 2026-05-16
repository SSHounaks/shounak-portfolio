Build Error



Expected '</', got 'jsx text'
./components/testimonials-section.tsx (133:24)

Expected '</', got 'jsx text'
  131 |             </div>
  132 |           </div>
> 133 |         </TerminalCard>
      |                        ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
> 134 |       </div>
      | ^^^^^^
  135 |
  136 |       <div className="md:col-span-6 flex flex-col">
  137 |         <ContactSection />

Parsing ecmascript source code failed

Import traces:
  Client Component Browser:
    ./components/testimonials-section.tsx [Client Component Browser]
    ./app/page.tsx [Client Component Browser]
    ./app/page.tsx [Server Component]

  Client Component SSR:
    ./components/testimonials-section.tsx [Client Component SSR]
    ./app/page.tsx [Client Component SSR]
    ./app/page.tsx [Server Component]