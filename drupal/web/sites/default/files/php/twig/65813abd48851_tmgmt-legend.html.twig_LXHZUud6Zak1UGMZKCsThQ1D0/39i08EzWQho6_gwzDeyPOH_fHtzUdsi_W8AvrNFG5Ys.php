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

/* modules/contrib/tmgmt/templates/tmgmt-legend.html.twig */
class __TwigTemplate_5bb7b83afc72a8e2da528a326fe2696d extends Template
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
        // line 13
        echo "<div class=\"tmgmt-legend clearfix\">
  <div class=\"tmgmt-status\">";
        // line 14
        echo $this->extensions['Drupal\Core\Template\TwigExtension']->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed(($context["title"] ?? null), 14, $this->source), "html", null, true);
        echo "</div>
  ";
        // line 15
        $context['_parent'] = $context;
        $context['_seq'] = twig_ensure_traversable(($context["items"] ?? null));
        foreach ($context['_seq'] as $context["_key"] => $context["item"]) {
            // line 16
            echo "    <div class=\"tmgmt-legend-wrapper\">
      <div class=\"tmgmt-legend-icon\">
        <img width=\"16\" height=\"16\" src=\"";
            // line 18
            echo $this->extensions['Drupal\Core\Template\TwigExtension']->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed(twig_get_attribute($this->env, $this->source, $context["item"], "icon", [], "any", false, false, true, 18), 18, $this->source), "html", null, true);
            echo "\">
      </div>
      <div class=\"tmgmt-legend-status\">";
            // line 20
            echo $this->extensions['Drupal\Core\Template\TwigExtension']->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed(twig_get_attribute($this->env, $this->source, $context["item"], "legend", [], "any", false, false, true, 20), 20, $this->source), "html", null, true);
            echo "</div>
    </div>
  ";
        }
        $_parent = $context['_parent'];
        unset($context['_seq'], $context['_iterated'], $context['_key'], $context['item'], $context['_parent'], $context['loop']);
        $context = array_intersect_key($context, $_parent) + $_parent;
        // line 23
        echo "</div>
";
    }

    public function getTemplateName()
    {
        return "modules/contrib/tmgmt/templates/tmgmt-legend.html.twig";
    }

    public function isTraitable()
    {
        return false;
    }

    public function getDebugInfo()
    {
        return array (  68 => 23,  59 => 20,  54 => 18,  50 => 16,  46 => 15,  42 => 14,  39 => 13,);
    }

    public function getSourceContext()
    {
        return new Source("{#
/**
 * @file
 * Default theme implementation for the state legend.
 *
 * Available variables:
 * - title: The title of the legend.
 * - items: Each icon with its legend.
 *
 * @ingroup themeable
 */
#}
<div class=\"tmgmt-legend clearfix\">
  <div class=\"tmgmt-status\">{{ title }}</div>
  {% for item in items %}
    <div class=\"tmgmt-legend-wrapper\">
      <div class=\"tmgmt-legend-icon\">
        <img width=\"16\" height=\"16\" src=\"{{ item.icon }}\">
      </div>
      <div class=\"tmgmt-legend-status\">{{ item.legend }}</div>
    </div>
  {% endfor %}
</div>
", "modules/contrib/tmgmt/templates/tmgmt-legend.html.twig", "/app/drupal/web/modules/contrib/tmgmt/templates/tmgmt-legend.html.twig");
    }
    
    public function checkSecurity()
    {
        static $tags = array("for" => 15);
        static $filters = array("escape" => 14);
        static $functions = array();

        try {
            $this->sandbox->checkSecurity(
                ['for'],
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
