<?php

use Twig\Environment;
use Twig\Error\LoaderError;
use Twig\Error\RuntimeError;
use Twig\Extension\SandboxExtension;
use Twig\Markup;
use Twig\Sandbox\SecurityError;
use Twig\Sandbox\SecurityNotAllowedTagError;
use Twig\Sandbox\SecurityNotAllowedFilterError;
use Twig\Sandbox\SecurityNotAllowedFunctionError;
use Twig\Source;
use Twig\Template;

/* themes/contrib/gin/templates/form/text-format-wrapper.html.twig */
class __TwigTemplate_11c17eb5eddc326320129b59ba94ed47 extends Template
{
    private $source;
    private $macros = [];

    public function __construct(Environment $env)
    {
        parent::__construct($env);

        $this->source = $this->getSourceContext();

        $this->parent = false;

        $this->blocks = [
        ];
        $this->sandbox = $this->env->getExtension('\Twig\Extension\SandboxExtension');
        $this->checkSecurity();
    }

    protected function doDisplay(array $context, array $blocks = [])
    {
        $macros = $this->macros;
        // line 25
        $context["classes"] = [0 => "js-form-item", 1 => "form-item", 2 => ((        // line 28
($context["description_toggle"] ?? null)) ? ("help-icon__description-container") : (""))];
        // line 31
        echo "<div";
        echo $this->extensions['Drupal\Core\Template\TwigExtension']->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed(twig_get_attribute($this->env, $this->source, ($context["attributes"] ?? null), "addClass", [0 => ($context["classes"] ?? null)], "method", false, false, true, 31), 31, $this->source), "html", null, true);
        echo ">
  ";
        // line 32
        echo $this->extensions['Drupal\Core\Template\TwigExtension']->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed(($context["children"] ?? null), 32, $this->source), "html", null, true);
        echo "
  ";
        // line 33
        if (($context["description"] ?? null)) {
            // line 34
            echo "    ";
            // line 35
            $context["description_classes"] = [0 => ((            // line 36
($context["aria_description"] ?? null)) ? ("form-item__description") : ("")), 1 => ((            // line 37
($context["disabled"] ?? null)) ? ("is-disabled") : ("")), 2 => (((            // line 38
($context["description_display"] ?? null) == "invisible")) ? ("visually-hidden") : (""))];
            // line 41
            echo "    <div";
            echo $this->extensions['Drupal\Core\Template\TwigExtension']->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed(twig_get_attribute($this->env, $this->source, ($context["description_attributes"] ?? null), "addClass", [0 => ($context["description_classes"] ?? null)], "method", false, false, true, 41), 41, $this->source), "html", null, true);
            echo ">";
            echo $this->extensions['Drupal\Core\Template\TwigExtension']->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed(($context["description"] ?? null), 41, $this->source), "html", null, true);
            echo "</div>
  ";
        }
        // line 43
        echo "</div>
";
    }

    public function getTemplateName()
    {
        return "themes/contrib/gin/templates/form/text-format-wrapper.html.twig";
    }

    public function isTraitable()
    {
        return false;
    }

    public function getDebugInfo()
    {
        return array (  68 => 43,  60 => 41,  58 => 38,  57 => 37,  56 => 36,  55 => 35,  53 => 34,  51 => 33,  47 => 32,  42 => 31,  40 => 28,  39 => 25,);
    }

    public function getSourceContext()
    {
        return new Source("{#
/**
 * @file
 * Theme override for a text format-enabled form element.
 *
 * @todo Remove when https://www.drupal.org/node/3016346 and
 * https://www.drupal.org/node/3016343 are fixed.
 *
 * Available variables:
 * - children: Text format element children.
 * - description: Text format element description.
 * - attributes: HTML attributes for the containing element.
 * - aria_description: Flag for whether or not an ARIA description has been
 *   added to the description container.
 * - description_attributes: attributes for the description.
 *   @see https://www.drupal.org/node/3016343
 * - disabled: An indicator for whether the associated form element is disabled,
 *   added by this theme.
 *   @see https://www.drupal.org/node/3016346
 *
 * @see template_preprocess_text_format_wrapper()
 */
#}
{%
  set classes = [
  'js-form-item',
  'form-item',
  description_toggle ? 'help-icon__description-container',
]
%}
<div{{ attributes.addClass(classes) }}>
  {{ children }}
  {% if description %}
    {%
      set description_classes = [
      aria_description ? 'form-item__description',
      disabled ? 'is-disabled',
      description_display == 'invisible' ? 'visually-hidden',
    ]
    %}
    <div{{ description_attributes.addClass(description_classes) }}>{{ description }}</div>
  {% endif %}
</div>
", "themes/contrib/gin/templates/form/text-format-wrapper.html.twig", "/app/drupal/web/themes/contrib/gin/templates/form/text-format-wrapper.html.twig");
    }
    
    public function checkSecurity()
    {
        static $tags = array("set" => 25, "if" => 33);
        static $filters = array("escape" => 31);
        static $functions = array();

        try {
            $this->sandbox->checkSecurity(
                ['set', 'if'],
                ['escape'],
                []
            );
        } catch (SecurityError $e) {
            $e->setSourceContext($this->source);

            if ($e instanceof SecurityNotAllowedTagError && isset($tags[$e->getTagName()])) {
                $e->setTemplateLine($tags[$e->getTagName()]);
            } elseif ($e instanceof SecurityNotAllowedFilterError && isset($filters[$e->getFilterName()])) {
                $e->setTemplateLine($filters[$e->getFilterName()]);
            } elseif ($e instanceof SecurityNotAllowedFunctionError && isset($functions[$e->getFunctionName()])) {
                $e->setTemplateLine($functions[$e->getFunctionName()]);
            }

            throw $e;
        }

    }
}
