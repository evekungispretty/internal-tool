import { useState } from "react";
import { Button } from "./ui/button";
import { ArrowLeft } from "lucide-react";
import { SetupStep } from "./experiment-steps/SetupStep";
import { VariantsStep } from "./experiment-steps/VariantsStep";
import { TargetingStep } from "./experiment-steps/TargetingStep";
import { ReviewStep } from "./experiment-steps/ReviewStep";

interface CreateExperimentProps {
  onBack: () => void;
}

type Step = 1 | 2 | 3 | 4;

export function CreateExperiment({ onBack }: CreateExperimentProps) {
  const [currentStep, setCurrentStep] = useState<Step>(1);

  const steps = [
    { number: 1, label: "Setup" },
    { number: 2, label: "Variants" },
    { number: 3, label: "Targeting" },
    { number: 4, label: "Review & Launch" },
  ];

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={onBack}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1>New Experiment</h1>
      </div>

      {/* Step Indicator */}
      <div className="bg-white border rounded-lg p-6">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => (
            <div key={step.number} className="flex items-center flex-1">
              <div className="flex items-center gap-3">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    currentStep >= step.number
                      ? "bg-[#003087] text-white"
                      : "bg-gray-200 text-gray-500"
                  }`}
                >
                  {step.number}
                </div>
                <span
                  className={`text-sm font-medium ${
                    currentStep >= step.number ? "text-foreground" : "text-muted-foreground"
                  }`}
                >
                  {step.label}
                </span>
              </div>
              {index < steps.length - 1 && (
                <div className="flex-1 h-0.5 bg-gray-200 mx-4" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Step Content */}
      <div className="bg-white border rounded-lg p-8">
        {currentStep === 1 && <SetupStep />}
        {currentStep === 2 && <VariantsStep />}
        {currentStep === 3 && <TargetingStep />}
        {currentStep === 4 && <ReviewStep />}
      </div>

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          onClick={() => setCurrentStep(Math.max(1, currentStep - 1) as Step)}
          disabled={currentStep === 1}
        >
          Previous
        </Button>
        <div className="flex items-center gap-3">
          <Button variant="ghost">Save as Draft</Button>
          {currentStep < 4 ? (
            <Button
              className="bg-[#003087] hover:bg-[#002866]"
              onClick={() => setCurrentStep(Math.min(4, currentStep + 1) as Step)}
            >
              Next Step
            </Button>
          ) : (
            <Button className="bg-[#003087] hover:bg-[#002866]">
              Launch Experiment
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
