import {Player} from '@remotion/player';
import {StudioIntro} from '../remotion/StudioIntro';
export default function RemotionDemo(){return <div className="remotion-stage"><Player component={StudioIntro} compositionWidth={1280} compositionHeight={720} durationInFrames={120} fps={30} controls autoPlay={false} loop style={{width:'100%',aspectRatio:'16/9'}}/></div>}