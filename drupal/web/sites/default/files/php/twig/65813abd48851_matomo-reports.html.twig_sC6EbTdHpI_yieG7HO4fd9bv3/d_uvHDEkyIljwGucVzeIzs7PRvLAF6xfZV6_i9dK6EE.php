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

/* modules/contrib/matomo_reports/templates/matomo-reports.html.twig */
class __TwigTemplate_53741d0c0caca7438d3b7d735713ade8 extends Template
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
        // line 10
        echo "
";
        // line 11
        $context['_parent'] = $context;
        $context['_seq'] = twig_ensure_traversable(($context["data_url"] ?? null));
        foreach ($context['_seq'] as $context["_key"] => $context["data"]) {
            // line 12
            echo "  ";
            if ( !(null === twig_get_attribute($this->env, $this->source, $context["data"], "empty_text", [], "any", false, false, true, 12))) {
                // line 13
                echo "      ";
                echo $this->extensions['Drupal\Core\Template\TwigExtension']->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed(twig_get_attribute($this->env, $this->source, $context["data"], "empty_text", [], "any", false, false, true, 13), 13, $this->source), "html", null, true);
                echo "

  ";
            } else {
                // line 16
                echo "
<h2>";
                // line 17
                echo $this->extensions['Drupal\Core\Template\TwigExtension']->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed(twig_get_attribute($this->env, $this->source, $context["data"], "title", [], "any", false, false, true, 17), 17, $this->source), "html", null, true);
                echo "</h2>
<div class=\"widgetIframe\"><iframe style=\"border: 0 none; width: 100%; height: ";
                // line 18
                echo $this->extensions['Drupal\Core\Template\TwigExtension']->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed(twig_get_attribute($this->env, $this->source, $context["data"], "iframe_height", [], "any", false, false, true, 18), 18, $this->source), "html", null, true);
                echo "px;\" src=\"";
                echo $this->extensions['Drupal\Core\Template\TwigExtension']->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed(twig_get_attribute($this->env, $this->source, $context["data"], "url", [], "any", false, false, true, 18), 18, $this->source), "html", null, true);
                echo "\" scrolling=\"auto\" frameborder=\"0\"></iframe></div>
  ";
            }
        }
        $_parent = $context['_parent'];
        unset($context['_seq'], $context['_iterated'], $context['_key'], $context['data'], $context['_parent'], $context['loop']);
        $context = array_intersect_key($context, $_parent) + $_parent;
    }

    public function getTemplateName()
    {
        return "modules/contrib/matomo_reports/templates/matomo-reports.html.twig";
    }

    public function isTraitable()
    {
        return false;
    }

    public function getDebugInfo()
    {
        return array (  63 => 18,  59 => 17,  56 => 16,  49 => 13,  46 => 12,  42 => 11,  39 => 10,);
    }

    public function getSourceContext()
    {
        return new Source("{#
/**
 * @file
 * Default implementation of the visitors overview report template.
 *
 * Available variables:
 * - \$data_url: complete url with params to get selected report.
 */
#}

{% for data in data_url %}
  {% if data.empty_text is not null %}
      {{ data.empty_text}}

  {% else %}

<h2>{{ data.title }}</h2>
<div class=\"widgetIframe\"><iframe style=\"border: 0 none; width: 100%; height: {{ data.iframe_height}}px;\" src=\"{{ data.url }}\" scrolling=\"auto\" frameborder=\"0\"></iframe></div>
  {% endif %}
{% endfor %}", "modules/contrib/matomo_reports/templates/matomo-reports.html.twig", "/app/drupal/web/modules/contrib/matomo_reports/templates/matomo-reports.html.twig");
    }
    
    public function checkSecurity()
    {
        static $tags = array("for" => 11, "if" => 12);
        static $filters = array("escape" => 13);
        static $functions = array();

        try {
            $this->sandbox->checkSecurity(
                ['for', 'if'],
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
