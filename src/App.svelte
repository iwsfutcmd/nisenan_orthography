<script lang="ts">
  let baseWords: string[] = [
    "Nisenaan",
    "'bysep’yyk’'",
    "cëëwmukum",
`"Nik myymaadi de sawisma!" 
"Otanbodi de sawisma!"
"Nik myymaadi de sawisma!"
"Otanbodi de sawisma!"
`,
    `K’ut’im pitcaak’am ham lajim peenim haj uk’ojmukum jamanna pittaatak’a pak’oji. Han haj k’ut’im pitcaak’am ba toojeen myji pamukum. Hace haj k’ut’im pitcaak’ak ba cëëwmukum. Hace haj pitcaak’am woomukum. Han haj woon ek’ojusan emukum sa tajim k’awna. Han haj 
"Nik myymaadi de sawisma!" 
"Otanbodi de sawisma!"
"Nik myymaadi de sawisma!"
"Otanbodi de sawisma!"
Hace haj "Hode? Hode?" hamukum. "Hode mym sam?" "Myym da hodo taji sa." K’ut’im myjna etan emukum sa. Han haj kaanteem wak’a heet’amukum. Hace haj kaanteem wak’am uk’ojsyn k’aamukum sa meek’ojsyn. Han haj kapam hadykym k’utonim nek kyymukum. Hace haj lismo s woojok’ojmukum. Hace haj lisnom uk’ojin mym sa loomukum. Han haj toojeemukum. Han haj dappe emukum. Hace haj dappem "homaa be, ty?" han "Aj, nik’i paanim my!" hamukum. "Maat’im!" hamukum. "Oo, mej nik, ty!" "Pa macak’ii ni!" "Ok’om dani!" "Oo, nik’i pajjom hesupajim my!" "Oo, mej nik, ty!" "Myji dani aanik’i!" Hace haj "Oo, sam my!" "Oo, mej nik, ty!" "Mym sa dani aanik’i!" Han haj... umm... he got mad... Han haj mym sani wo’opajmukum. Hace haj hedem k’awim samukum. Dappem t’aanon woonomukum`,
  ];

  type OrthographyOption = [
    Array<string | RegExp>,
    { [key: string]: Array<string> }
  ];

  // prettier-ignore
  const orthographyOptions: {[key: string]: OrthographyOption} = {
    "p’": [["p’", "P’"], {
      "ṕ": ["ṕ", "Ṕ"],
      "ᵽ": ["ᵽ", "Ᵽ"],
      "ƥ": ["ƥ", "Ƥ"],
    }],
    "t’": [["t’", "T’"], {
      "t́": ["t́", "T́"],
      "ŧ": ["ŧ", "Ŧ"],
      "ƭ": ["ƭ", "Ƭ"],
    }],
    "k’": [["k’", "K’"], {
      "ḱ": ["ḱ", "Ḱ"],
      "ꝁ": ["ꝁ", "Ꝁ"],
      "ƙ": ["ƙ", "Ƙ"],
    }],
    "y": [["y"], {
      "ʉ": ["ʉ"]
    }],
    "c": [["c"], {
      "ts": ["ts"]
    }],
    "b": [["b"], {
      "ƀ": ["ƀ"],
      "ɓ": ["ɓ"],
    }],
    "d": [["d"], {
      "đ": ["đ"],
      "ɗ": ["ɗ"],
    }],
    "j": [["j"], {
      "y": ["y"]
    }],
    "ë": [["ë"], {
      "ə": ["ə"]
    }],
    "’": [[/(?<![ptkPTK])’/g], {
      "ʔ": ["ʔ"]
    }],
    "aa": [[/([aeiouyë]){2}/g], {
      "aː": ["$1ː"]
    }]
  };

  const keyOrder = ["aa", "p’", "t’", "k’", "y", "c", "b", "d", "j", "ë", "’"];

  const fonts = [
    "Noto Sans",
    "Noto Serif",
    "Noto Sans Display",
    "Noto Serif Display",
    "Arial"
  ];

  // const orthographyOptions: Array<[string | RegExp, string[]]> = [
  //   ["p’", ["ṕ", "ᵽ", "ƥ"]],
  //   ["t’", ["t́", "ŧ", "ƭ"]],
  //   ["k’", ["ḱ", "ꝁ", "ƙ"]],
  //   ["y", ["ʉ"]],
  //   ["c", ["ts"]],
  //   ["b", ["ƀ", "ɓ"]],
  //   ["d", ["đ", "ɗ"]],
  //   ["j", ["y"]],
  //   ["ë", ["ə"]],
  //   [/([aeiouyë]){2}/g, ["$1ː"]],
  //   // ["’", ["ʔ"]],
  // ];
  // let currentOrthography: Array<[string | RegExp, string]> =
  //   orthographyOptions.map(([key, _]) => [key, null]);

  let currentOrthography: Array<[string, string]> = keyOrder.map((key) => [
    key,
    null,
  ]);

  // const transliterate = (
  //   baseWords: string[],
  //   currentOrthography: Array<[string | RegExp, string]>
  // ) =>
  //   baseWords.map((baseWord) => {
  //     [...currentOrthography]
  //       .sort((a, b) => b[0].toString().length - a[0].toString().length)
  //       .forEach(([k, v]) => {
  //         if (v) baseWord = baseWord.replaceAll(k, v);
  //       });
  //     return baseWord;
  //   });

  const transliterate = (
    baseWords: string[],
    currentOrthography: Array<[string, string]>
  ) =>
    baseWords.map((baseWord) => {
      [...currentOrthography].forEach(([inputKey, outputKey]) => {
        if (outputKey) {
          const inputs = orthographyOptions[inputKey][0];
          const outputs = orthographyOptions[inputKey][1][outputKey];
          inputs.forEach((input, i) => {
            baseWord = baseWord.replaceAll(input, outputs[i]);
          });
        }
      });
      return baseWord;
    });

  let result: string[] = [];
  let fontSize = 12;
  let fontWeight = 400;
  let fontWidth = 100;
  let fontContrast = 0;

  $: {
    // result = transliterate(baseWords, currentOrthography);
    result = transliterate(baseWords, currentOrthography);
  }
</script>

<main>
  <div id="orthography-options" class="sans">
    {#each keyOrder as inputKey, i}
      <form>
        <label
          ><input
            type="radio"
            bind:group={currentOrthography[i][1]}
            name={inputKey}
            value={null}
            checked
          />{inputKey}</label
        >
        {#each Object.keys(orthographyOptions[inputKey][1]) as outputKey}
          <label
            ><input
              type="radio"
              bind:group={currentOrthography[i][1]}
              name={inputKey}
              value={outputKey}
            />{outputKey}</label
          >
        {/each}
      </form>
      <hr />
    {/each}
    <label
      >Font Size: {fontSize}<input type="range" bind:value={fontSize} /></label
    >
    <label>
      Font Weight: {fontWeight}
      <input type="range" bind:value={fontWeight} min="100" max="900" />
    </label>
    <label>
      Font Width: {fontWidth}
      <input type="range" bind:value={fontWidth} min="62.5" max="100" />
    </label>
    <label>
      Font Contrast: {fontContrast}
      <input type="range" bind:value={fontContrast} min="0" max="100" />
    </label>
  </div>
  {#each fonts as font}
    <div
      class="results"
      style="
      font-family: '{font}', 'Last Resort'; 
      font-size: {fontSize}pt; 
      font-variation-settings: 'wght' {fontWeight}, 'wdth' {fontWidth}, 'CTGR' {fontContrast};
      "
    >
      {#each result as output}
        <div>{output}</div>
        <hr />
      {/each}
    </div>
  {/each}
  <!-- <div>
    {#each currentOrthography2 as [fromO, toO]}
      <h2>{fromO}: {toO}</h2>
    {/each}
  </div> -->
</main>

<style>
  /* @import url("https://fonts.googleapis.com/css2?family=Noto+Sans&family=Noto+Serif&family=Open+Sans&family=Arimo"); */

  @font-face {
    font-family: "Last Resort";
    src: url("/fonts/LastResortHE-Regular.ttf") format("truetype");
  }
  @font-face {
    font-family: "Noto Sans";
    src: url("/fonts/NotoSans-VF.ttf") format("truetype-variations");
  }
  @font-face {
    font-family: "Noto Serif";
    src: url("/fonts/NotoSerif-VF.ttf") format("truetype-variations");
  }
  @font-face {
    font-family: "Noto Sans Display";
    src: url("/fonts/NotoSansDisplay-VF.ttf") format("truetype-variations");
  }
  @font-face {
    font-family: "Noto Serif Display";
    src: url("/fonts/NotoSerifDisplay-VF.ttf") format("truetype-variations");
  }

  :root {
    font-family: "Noto Sans";
  }

  main {
    display: flex;
  }

  #orthography-options > form {
    display: flex;
  }

  #orthography-options > form > label {
    display: flex;
    white-space: nowrap;
  }

  .results {
    white-space: pre-wrap;
    margin-inline-start: 8px;
  }

  .sans {
    font-family: "Noto Sans", "Last Resort";
  }
</style>
