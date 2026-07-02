import { Button } from '../../../shared/ui/button';
import {
  AVATAR_EXPRESSIONS,
  type AvatarExpression,
} from '../../../entities/avatar/model/avatar-types';
import './expression-controls.css';

type ExpressionControlsProps = {
  value: AvatarExpression;
  onChange: (value: AvatarExpression) => void;
};

export const ExpressionControls = ({ value, onChange }: ExpressionControlsProps) => (
  <section className="control-group" aria-labelledby="expression-controls-title">
    <h2 id="expression-controls-title" className="control-group__title">
      Expression
    </h2>
    <div className="control-group__grid">
      {AVATAR_EXPRESSIONS.map((expression) => (
        <Button
          isActive={value === expression.value}
          key={expression.value}
          onClick={() => onChange(expression.value)}
        >
          {expression.label}
        </Button>
      ))}
    </div>
  </section>
);
