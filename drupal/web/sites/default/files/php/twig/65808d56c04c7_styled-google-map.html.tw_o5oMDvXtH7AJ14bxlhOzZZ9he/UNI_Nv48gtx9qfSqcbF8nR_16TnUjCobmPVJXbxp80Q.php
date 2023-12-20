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

/* modules/contrib/styled_google_map/templates/styled-google-map.html.twig */
class __TwigTemplate_38859088d5ec8e6f11123fdbaf0ba0a7 extends Template
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
        // line 1
        echo "<div class=\"styled_map\" id=\"styled-google-map-";
        echo $this->extensions['Drupal\Core\Template\TwigExtension']->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed(($context["gid"] ?? null), 1, $this->source), "html", null, true);
        echo "\"></div>
";
        // line 2
        if (($context["steps"] ?? null)) {
            // line 3
            echo "  <div class=\"route-details\" id=\"steps-";
            echo $this->extensions['Drupal\Core\Template\TwigExtension']->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed(($context["gid"] ?? null), 3, $this->source), "html", null, true);
            echo "\"></div>
";
        }
        // line 5
        if (($context["directions_form"] ?? null)) {
            // line 6
            echo "  ";
            echo $this->extensions['Drupal\Core\Template\TwigExtension']->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed(($context["directions_form"] ?? null), 6, $this->source), "html", null, true);
            echo "
";
        }
    }

    public function getTemplateName()
    {
        return "modules/contrib/styled_google_map/templates/styled-google-map.html.twig";
    }

    public function isTraitable()
    {
        return false;
    }

    public function getDebugInfo()
    {
        return array (  54 => 6,  52 => 5,  46 => 3,  44 => 2,  39 => 1,);
    }

    public function getSourceContext()
    {
        return new Source("<div class=\"styled_map\" id=\"styled-google-map-{{ gid }}\"></div>
{% if steps %}
  <div class=\"route-details\" id=\"steps-{{ gid }}\"></div>
{% endif %}
{% if directions_form %}
  {{ directions_form }}
{% endif %}
", "modules/contrib/styled_google_map/templates/styled-google-map.html.twig", "/app/drupal/web/modules/contrib/styled_google_map/templates/styled-google-map.html.twig");
    }
    
    public function checkSecurity()
    {
        static $tags = array("if" => 2);
        static $filters = array("escape" => 1);
        static $functions = array();

        try {
            $this->sandbox->checkSecurity(
                ['if'],
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
