import { Ref, ref } from "vue";
import 主 from "../assets/主.png";
import 今 from "../assets/今.png";
import 他 from "../assets/他.png";
import 令 from "../assets/令.png";
import 元 from "../assets/元.png";
// import { KanjiCanvas } from "./kanji-canvas";

export interface KanjiDrawExcercise {
  kanji: string;
  strokeCount: number;
  imageUrl: string;
}

const exercises: KanjiDrawExcercise[] = [
  {
    kanji: "主",
    strokeCount: 5,
    imageUrl: 主,
  },
  {
    kanji: "今",
    strokeCount: 4,
    imageUrl: 今,
  },
  {
    kanji: "他",
    strokeCount: 5,
    imageUrl: 他,
  },
  {
    kanji: "令",
    strokeCount: 5,
    imageUrl: 令,
  },
  {
    kanji: "元",
    strokeCount: 4,
    imageUrl: 元,
  },
];

export const useKanjiExcercises = () => {
  let currentIndex = 0;
  const currentExercise: Ref<KanjiDrawExcercise> = ref(exercises[currentIndex]);

  const nextExercise = () => {
    currentIndex++;
    if (currentIndex >= exercises.length) {
      currentIndex = 0;
    }
    currentExercise.value = exercises[currentIndex];
  };

  // const evaluate = (canvas: KanjiCanvas, excercise: KanjiDrawExcercise) => {
  //   // Get the current image offset of the excercise.
  //   let image = new Image();
  //   image.src = excercise.imageUrl;

  //   // The image is loaded asynchronously, so we need to wait for it to load.
  //   image.onload = () => {
  //     let canvasImage = canvas.getImageData();
  //     let imagePixels = canvas.getImageData(image);

  //     // Compare the two images pixel by pixel.
  //     let errorCount = 0;
  //     for (let i = 0; i < imagePixels.length; i++) {
  //       if (canvasImage[i] !== imagePixels[i]) {
  //         errorCount++;
  //       }
  //     }

  //     // Calculate the error rate.
  //     let errorRate = errorCount / imagePixels.length;
  //     if (errorRate < 0.1) {
  //       nextExercise();
  //     }
  //   };

  // };

  return { currentExercise, nextExercise };
};
