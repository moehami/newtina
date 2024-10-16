import React from "react";
import { TinaMarkdown, TinaMarkdownContent } from "tinacms/dist/rich-text";
import { TiTick } from "react-icons/ti";
import Actions from "./ActionsButton";
import { tinaField } from "tinacms/dist/react";

interface PlanAction {
  label: string;
  url: string;
  variant?: string;
  size?: string;
}

interface Plan {
  planTier: string;
  planDescription: string;
  price: string;
  subPriceText: string;
  actions: PlanAction;
  isRecommended: boolean;
}

interface AllPlan {
  title: string | null;
}

interface PricingData {
  title?: string;
  description?: TinaMarkdownContent;
  allPlans?: AllPlan[];
  plans?: Plan[];
}

interface PricingProps {
  data: PricingData;
}

const Pricing = ({ data }: PricingProps) => {
  const { title, description, allPlans, plans } = data;

  return (
    <div className="pricing-component container mx-auto p-4 mb-14 lg:mb-4 mt-20 lg:mt-32 md:mt-0 lg:pb-40">
      {title && (
        <h1
          className="text-5xl text-center  text-white mb-4"
          data-tina-field={tinaField(data, "title")}
        >
          {title}
        </h1>
      )}

      {description && (
        <div
          className="text-lg text-white text-center px-4 mb-8"
          data-tina-field={tinaField(data, "description")}
        >
          <TinaMarkdown content={description} />
        </div>
      )}

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 xl:grid-cols-5 px-12 lg:px-12">
        {allPlans && allPlans.length > 0 && (
          <div
            className="all-plans p-4 rounded-lg text-white col-span-1 lg:col-span-2 lg:mx-auto xl:col-span-1"
            data-tina-field={tinaField(data, "allPlans")}
          >
            <h3 className="text-xl font-semibold mb-4">All Plans Include:</h3>
            <ul>
              {allPlans.map(
                (plan, index) =>
                  plan?.title && (
                    <li key={index} className="flex items-center text-md pb-2">
                      <TiTick className="text-white mr-2" />
                      {plan.title}
                    </li>
                  )
              )}
            </ul>
          </div>
        )}

        {plans &&
          plans.length > 0 &&
          plans.map((plan, index) => (
            <div
              key={index}
              className={`plan-card text-white border border-opacity-10  border-white px-6 py-10 rounded-3xl shadow-xl bg-opacity-20 hover:bg-opacity-30 transition-opacity duration-200 bg-stone-600 ${
                plan.isRecommended
                  ? "border-3 border-white border-opacity-100"
                  : ""
              }`}
              data-tina-field={tinaField(data, "plans", index)}
            >
              {plan.planTier && (
                <div className="mb-2 flex items-center justify-between">
                  <h3 className="text-3xl">{plan.planTier}</h3>
                  {plan.isRecommended && (
                    <p className="text-sm bg-gray-300 bg-opacity-40 rounded-full px-2 py-1">
                      Most Popular
                    </p>
                  )}
                </div>
              )}

              {plan.planDescription && (
                <p className="text-md mb-8">{plan.planDescription}</p>
              )}
              {plan.price && <p className="text-3xl mb-2">{plan.price}</p>}
              {plan.subPriceText && (
                <p className="text-sm text-white mb-4">{plan.subPriceText}</p>
              )}

              {plan.actions && (
                //@ts-expect-error investigate after
                <Actions actions={[plan.actions]} className="w-[100%]" />
              )}
            </div>
          ))}
      </div>
    </div>
  );
};

export default Pricing;
