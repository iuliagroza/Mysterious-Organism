// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ['A', 'T', 'C', 'G'];
  return dnaBases[Math.floor(Math.random() * 4)];
};

// Returns a random single stand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = [];
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase());
  }
  return newStrand;
};

// Factory function to create multiple specimens of P. aequor
const pAequorFactory = (num, dna) => {
  return {
    _specimenNum: num,
    get specimenNum() {
      return this._specimenNum;
    },
    set specimenNum(num) {
      if(typeof num === "number") {
        this._specimenNum = num;
      } else {
        console.log("ERROR: The specimen's number must be of int type.");
      }
    },

    dna: dna,

    // Mutates one random base in the specimen's DNA
    mutate() {
      const baseIndex = Math.floor(Math.random()*15);

      let mutationBase = returnRandBase();
      while(this.dna[baseIndex] === mutationBase) {
        mutationBase = returnRandBase();
      }

      this.dna[baseIndex] = mutationBase;
      return this.dna;
    },

    // Outputs the percentage of identical DNA between two specimens
    compareDNA(otherPAequor) {
      let identicalBasesCount = 0;

      for(let i=0; i<15; i++) {
        if(this.dna[i] === otherPAequor.dna[i]) {
          identicalBasesCount++;
        }
      }

      const percentage = Math.round((identicalBasesCount*100/15)*100)/100;
      console.log(`Specimen #${this.specimenNum} and specimen #${otherPAequor.specimenNum} have ${percentage}% DNA in common.`);
    },

    // A specimen is likely to survive only if its DNA is at least 60% made of Guanine(G) or Cytosine(C)
    willLikelySurvive() {
      let CsAndGs = 0;
      for(let i=0; i<15; i++) {
        if(this.dna[i] === 'G' || this.dna[i] === 'C') {
          CsAndGs++;
        }
      }

      const percentage = CsAndGs*100/15;
      if(percentage > 60) {
        return true;
      } else {
        return false;
      }
    },

    // Creates the complementary DNA strand of the specimen
    complementStrand() {
      let complementaryDNA = [];
      for(let i=0; i<15; i++) {
        switch(this.dna[i]) {
          case 'A':
            complementaryDNA.push('T');
            break;
          case 'T':
            complementaryDNA.push('A');
            break;
          case 'G':
            complementaryDNA.push('C');
            break;
          case 'C':
            complementaryDNA.push('G');
            break;
          default:
            break;
        }
      }
      return complementaryDNA;
    }
  };
};

// Creates 30 specimens of P. aequors that will survive
const create30Instances = () => {
  let specimens = [];
  while(specimens.length < 30) {
    const specimen = pAequorFactory(specimens.length+1, mockUpStrand());
    if(specimen.willLikelySurvive()) {
      specimens.push(specimen);
    }
  }
  return specimens;
}

let pAequors = create30Instances();
console.log(pAequors);







