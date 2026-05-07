/* ===================================================================
   data.js — Datos del portfolio
   =================================================================== */

const SKILLS = [
  { icon: '🎨', label: 'SAP Fiori / UI5' },
  { icon: '⚙️', label: 'ABAP / RAP' },
  { icon: '📡', label: 'OData Services' },
  { icon: '🗂️', label: 'CDS Views' },
  { icon: '🏗️', label: 'SAP Build' },
  { icon: '🖨️', label: 'SmartForms / Adobe Forms' },
  { icon: '🔧', label: 'BADIs / User Exits' },
  { icon: '💻', label: 'JavaScript / TypeScript' },
  { icon: '⚡', label: 'Node.js' },
  { icon: '🐙', label: 'Git / GitHub' },
  { icon: '🐳', label: 'Docker' },
  { icon: '🗃️', label: 'SQL / HANA' },
];

const CLIENTS = [
  { logo: '🏭', name: 'Industrias XYZ',   sector: 'Manufactura' },
  { logo: '🏦', name: 'Banco Nacional',   sector: 'Banca & Finanzas' },
  { logo: '🛒', name: 'RetailGroup',      sector: 'Retail' },
  { logo: '⚡', name: 'EnergíaPlus',      sector: 'Energía' },
  { logo: '🚚', name: 'LogiTrans',        sector: 'Logística' },
  { logo: '🏥', name: 'HealthCorp',       sector: 'Salud' },
  { logo: '🏗️', name: 'Constructora Sur', sector: 'Construcción' },
  { logo: '✈️', name: 'AeroServices',     sector: 'Aviación' },
];

/* ── BLOG POSTS (cuerpo cifrado con AES-256-GCM + PBKDF2) ──────────
   Título, fecha, tags e imágenes van en claro para renderizar tarjetas.
   El cuerpo solo se descifra al abrir el post con la contraseña correcta.
   Contraseña de demo: portfolio2025
   ─────────────────────────────────────────────────────────────────── */
const BLOG_POSTS = [
  {
    id: 'post-001',
    title: 'Optimizando OData V4 en SAP Fiori',
    date: '2025-04-28',
    tags: ['SAP', 'Fiori', 'OData'],
    emoji: '🚀',
    images: [],
    encryptedBody: 'pJ4WmsWaGOteq1VGfay76jUFqJDe7ldAJk1nSd7Ay2264W3YWv41KIJ3djNFoHMQMSEudvjfalDDLv9kklImSxun+pJkIIrUJvv+POVmbHaABlDva1BU8HLldAJ4CLx2m8zd5OksBZMILDvRMvO/VOAQifFDTMXWwZ4hI5/lfRHL0dyamznwtDgeQnYrH9bfewV/47WM5B8hZdVP0gwHmfCGZka4KSXuA9Kk94mKZK8JlW92hrSyEL31v19fFQf1J7pyfJmCtzAkU28tMobzpCW23bOi048E3deKkOmf+roKvCXipkGnBUFFspqP2Z0nBfckl5ngI85VL2gs9smZ3o7P3/CWo3QzKE/JEzFNAIO6jG2Z8YwnfgqyEP795tS0higQjP5J9rka/D1+/prnoILBu3ifio+RbnyxYx5yo3E6paIP4/12ZMrIgbiWjlYHsIDuRnsMZSnvNMYThieyvMfELkbvLjvkP6N9RBb9mRVt0dAnc8Dy0OFWteK8IFNftyKV/GjiDTudjxh7/7KXuCsCMqSRQgvSAYiEb0YG0FrXFOm8LnLQpScV+jLMIxyhGFWq6FaOReb5o97uPjEP2yaRyFUpnXRsVcE8VmcaMeeQ1m3cBjn5rP4ATIs0789GAKssjEeTAce4Bs2yiKclUdZAZN1L6FLD9PNrb7HqcYnlz+SCacdKTTiXX9f2O2lpt0Wfympu5QHfMTk3LOHgNpC1Bqj11jPcAgAam7YA9liiPXkshlOPc1yEf9rDExFLY6t/Us3quL5dDWksJ4h6Gna56szbwSh8Jm64ZaD+m4lH1qDkfSyrYhlSYJPVch5MFQQsKrSDFFVI+YXsz6AGCI3KV3ML93SbHh52ae38u/K1FZzapC+7b45bhMAcG/AQgPeF6OXtg64/t5hJ1U+znl+meZ5uwN6vyDHofbMhi5mUkkKAYGrI7XFei/hsZ3FN442dxHVKEGMXHGM4QvqqNSxGk8xRIB61DdSRUnBclDzpA/V76b8Po2Ss9+B7QCGS54CdeZ3yc5+Yn0V0S8EKDMmvHBSCmbeTsX9Z3EWM+M3iQlvZKymp0WUoV37exuJsnIXquLWcyo9qAiNUXSjbGULR2Xrf6uNkgIOPb4MuIWaQTbGuJ3TSlHGKryBVmNmdO2tirG62zCOc+zSUIfoFPhMLvUKoBQSsbGDGdLLQmmrqU6jQMR7iYMIbIlaVsAb9NmYxksKxz/IG878ZeJdg/pgVW7Vf9W5Ct5MpF+0NxsBXI6UUPmcX436FzjrxZzQPncZQOXjRiapc8YY2KRecpgDH4+TiYLtW0womTOZ3kefj5ccAS/s/4ksbVRxrX1nRPtpSszfeyox/5UFxRFS55mQY4HAAIxIOcnUeuFC/+q4vsgZyoI5YUVF6E+KkV3ui3dqbX0F6KW+s7q+dWHz/OkgEPFT9JHPv5V/37Bjd+a5qQYUpQUa8jrLLfVts1HwtuKV57qdoyMYcYRMcYwSyIlKimaUC0QIxBEiHv6b8oT4UxzdpjQBp6BUTB2Mgjv6YUtc2vzUlhLTYHEaCgB8cEtZq3N5L/yQ/bIj8Djw6aYStkLze6DSs3YwWZd/KOR9BQoM7zFmSyat01qKxJAttreIV+ihouPhHiTgv2owLBEHXx1ZGPn0JSP+N1kiAvJsPnNSL9r4sSAY5A8mao8IoxsQRy5P0Hq9hEmQX/Ybaik3kRKssG8WNGnf8gFxqSOvB/dVN8DY9sVPIQ4Sp5DkFO6FzMj1wdW7/OzvWWRIuACCMpebmpwh8jVkjuazmW9AFwZNquQ==',
    iv:   'dHjaicgWmHfGtme3',
    salt: 'zLPdco89HZRJya0oUnAf5A=='
  },
  {
    id: 'post-002',
    title: 'RAP vs ABAP clásico: ¿cuándo usar cada uno?',
    date: '2025-03-15',
    tags: ['ABAP', 'RAP', 'CDS'],
    emoji: '🔧',
    images: [],
    encryptedBody: '51vulX2yo7+zS9Kv3b2NVTO/pAkoPbG5Tl3Hvl2YzmU19UwsrqsA78pgFXkWuRfVp2rfoY923JdkDdQ8cVvcWvpf0Qp2Bxtum4XUVL2R9PPyNBlbg9fBiRfMrKtfYNVlbdlLut1EiZF7xU9v+FxFXo/Amr5p5SltfnxzaYTKnOOpl/88nA+O/FYnnRKlYC6MmtgpL5rFCNoKz/kC3m8FzJdfcD74xk6uFqFZvtBQeAgieSNSLfhxyda9Mwc3+TM6cKS0Jv6OCfdVgDR2AZ6jbDpZj/A9LdY+PbdwiZRIkn7LlHNmy6Um2am6PdBHEoa93TCRpr6Rs+kTWZNgLT4h9a5ARxjEP7xM0mAUniQEnR/7gYiMajdKuKRVFENT6LldSFXVFKDN3WldlLY1d5pYjSuJXzpMt/mYch/v2ntQaUn6LnL8BQYvR3nhmOdBBEtn5Fp35lBodNw850BEyR5Fkd+3389odXX+uEbCS2n3IclaYny2WvCP5HYI8tweMi/1/bmBQ3hwUZKcrFZqLzwCerTUTbf+f92Nj8lolQdFR4vyyX7cwql9bsqHoCa0LbcQTWq9TILAL4wTHMDGC7QC6gxOnKX+NOFKbxV5GhyGUFlqNmDqNC6ebaEG5wCZso6kbIEeUTJYaWPV7QPMwOTHwjJ0y9M8Z+sQmeV6ReKzJaYCeYTjJusxSGgY052q+JBsydceoQQmyxzxP6BCC7zWfU3aSsOebiTlPwCXX/eVzgU0lMLVSvvhshg8BI7GU84Dc32XChtMxCGPQhLJ0/JPdLklNOl0k/bnIj3TBVA17h7vEjVhp8duSLEpo66IRc4PMtIRmsz3RGl52Hsq2osHcBKshcXD6tV6/lDeWP++zN2DxIz3MWZbdfE928Mtdz3MBB9NC/V7G5NRLtbYd8duPV9Z4tTnPnwNkgWUpmq+1pHlmhNLl6zDiFtHn5WeS8emxJVTB2Z77ZwUGvgsEz8ilL/QdWuJbnmqSV2h98BtFLD87kc/TlL/KLjRTZ6P5pTuQrI2wZeMmTn85QXNpTn37LQqLPnOOgU+dv6erRLVDE1p+MILjBOTmVljSvWFGveSR+CDUnDnB1qq0PewEl4QebeTbKqIIpzzqZrguZTaGDeVTKS+EwMG7G5t3lhw0+ycKc4krL0g8rkYzCuzY9InV0cDRKamgZAtZm9h5Fz/gqJgCpQALi1NWUAX1JrYkOEp66/4iHKQJuOAdtQ8Mw9Mq6oIyDZSm9bW/mncK8c+tmGizFzyWZyhLcOUN8uzc92PP+cMlW1BPRr6LIxJ34yQ5uJ8F2FEf75mGHuH5ES6Jq84+OdK8jEqmjebmHgSWrcE8GvkKbd08MZlfp05fkvq0vsbuYzGqcPKKmXZHl1DaJOrLFpPckHQykiPZuoJUFY1Md7wmGGwgPex474rElRJNjB5v3wtj7wj/N5uQdUosvgCQRHuM8rkIkDIsxejJYJoFgUhNey0OiH62L5EPcbTIw+iMG6V/qY1eEthV27YymMP1O0bNdxw7b0f76BsD7jQaLD96aEFAxJtJKz2lUgzHEaa+TT9y+c4SR7ivl+IUKnK4+T31L5rBMM=',
    iv:   'TdnIp40iRbTsXPlP',
    salt: '746eAKjeNRVbOWhsKTKYCg=='
  },
  {
    id: 'post-003',
    title: 'Lo que nadie te dice sobre ser consultor SAP',
    date: '2025-02-02',
    tags: ['Reflexión', 'Carrera', 'SAP'],
    emoji: '💡',
    images: [],
    encryptedBody: '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',
    iv:   '5FXB848BHJw3IEHd',
    salt: 'SuV8RWHripqt4CUSHxXYcg=='
  }
];
