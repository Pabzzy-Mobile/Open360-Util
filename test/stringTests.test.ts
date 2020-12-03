import * as Util from '../src';

describe('String Operations', () => {
  it('works', () => {
    expect(Util.cryptography.IsEmail("goodEmail@gmail.com"))
        .toEqual(true);
    expect(Util.stringExtensions.sanitize("<script type='text/javascript'>alert(`CBT!!!`)</script>"))
        .toEqual("&lt;script type='text/javascript'&gt;alert(`CBT!!!`)&lt;/script&gt;");
    expect(Util.stringExtensions.getValue("key:value"))
        .toEqual("value");
    expect(Util.stringExtensions.diceUp("not on a new line \n this is on a new line"))
        .toEqual(["not on a new line ", " this is on a new line"]);
  });
});

describe('Segmentation Operations', () => {
  it('works', () => {
    expect(Util.segmentation.isSegmentFile("video.mp4"))
        .toEqual(true);
    expect(Util.segmentation.isSegmentFile("thumbnail.png"))
        .toEqual(true);
    expect(Util.segmentation.isSegmentFile("part.ts"))
        .toEqual(false);
  });
});
