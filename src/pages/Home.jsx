import Progress from "../components/Progress";
import {Calendar} from "../components/Calendar";
import { ActionCards } from "../components/ActionCards";
import { RecommendedSection } from "../components/RecommendedSection";
import { UpcomingEvents } from "../components/UpcomingEvents";
import { Partners } from "../components/Partners";

export const Home = () => {
    return (
      <div className="p-4 md:p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          <div className="md:col-span-2">
            <Progress />
          </div>
          <div>
            <Calendar />
          </div>
        </div>
        <div className="mt-4 md:mt-6">
          <ActionCards />
        </div>
        <div className="mt-4 md:mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          <div className="md:col-span-2">
            <RecommendedSection />
          </div>
          <div>
            <UpcomingEvents />
          </div>
        </div>
        <div className="mt-4 md:mt-6">
          <Partners />
        </div>
      </div>
    );
  };